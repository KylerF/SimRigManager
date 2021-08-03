from api.wsconnectionmanager import WebsocketConnectionManager
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from websockets.exceptions import ConnectionClosedError
from starlette.middleware.cors import CORSMiddleware
from typing import List
from json import load
from os import path
import asyncio
import redis

from database.database import get_db
from database import crud, schemas

class SimRigAPI:
    '''
    Provides the API routes and methods to interact with the entire application
    '''
    def __init__(self, queue_manager):
        self.queue_manager = queue_manager

        # Load the metadata for documentation tags
        meta_path = path.dirname(path.realpath(__file__))
        tags_metadata = load(open(path.join(meta_path, 'tags_metadata.json')))

        # Create a manager for websocket connections
        self.ws_connection_manager = WebsocketConnectionManager()

        # Set up the API
        self.api = FastAPI(
            title="SimRig Manager API", 
            openapi_tags=tags_metadata
        )

        # Connect to Redis
        self.redis_store = redis.Redis()

        # Configure CORS
        self.api.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        # Register endpoints
        self.api.get("/", response_model=schemas.Availability, tags=["availability"])(self.get_root)

        self.api.get("/latest", tags=["iracing data"])(self.get_latest)
        self.api.websocket("/stream")(self.data_stream)

        self.api.get("/drivers", response_model=List[schemas.Driver], tags=["drivers"])(self.get_drivers)
        self.api.post("/drivers", response_model=schemas.Driver, tags=["drivers"])(self.create_driver)
        self.api.patch("/drivers", response_model=schemas.Driver, tags=["drivers"])(self.update_driver)
        self.api.delete("/drivers", response_model=schemas.Driver, tags=["drivers"])(self.delete_driver)

        self.api.get("/activedriver", tags=["drivers"], response_model=schemas.ActiveDriver)(self.get_active_driver)
        self.api.post("/activedriver", tags=["drivers"], response_model=schemas.ActiveDriver)(self.set_active_driver)

        self.api.get("/scores", tags=["scores"], response_model=List[schemas.LapTime])(self.get_scores)
        self.api.post("/scores", tags=["scores"], response_model=schemas.LapTime)(self.create_score)

        self.api.get("/controllers", tags=["controllers"], response_model=List[schemas.LightController])(self.get_controllers)
        self.api.post("/controllers", tags=["controllers"], response_model=schemas.LightController)(self.create_controller)
        self.api.patch("/controllers", tags=["controllers"], response_model=schemas.LightController)(self.update_controller)
        self.api.delete("/controllers", tags=["controllers"], response_model=schemas.LightController)(self.delete_controller)

        self.api.get("/controllersettings", tags=["controllersettings"], response_model=schemas.LightControllerSettings)(self.get_controller_settings)
        self.api.post("/controllersettings", tags=["controllersettings"], response_model=schemas.LightControllerSettings)(self.create_controller_settings)

        self.api.get("/randomquote", tags=["quotes"], response_model=schemas.Quote)(self.get_random_quote)
        self.api.get("/quotes", tags=["quotes"], response_model=List[schemas.Quote])(self.get_quotes)
        self.api.post("/quotes", tags=["quotes"], response_model=schemas.Quote)(self.create_quote)
        self.api.patch("/quotes", tags=["quotes"], response_model=schemas.Quote)(self.update_quote)
        self.api.delete("/quotes", tags=["quotes"], response_model=schemas.Quote)(self.delete_quote)


    async def get_root(self):
        '''
        Availability check 
        '''
        return {"active": True}

    async def get_controllers(self, skip: int = 0, limit: int = 100):
        '''
        Get all WLED light controllers
        '''
        db = next(get_db())
        controllers = crud.get_light_controllers(db, skip=skip, limit=limit)

        return controllers

    async def get_controller_settings(self, controller_settings: schemas.LightControllerSettingsGet):
        '''
        Get controller settings linked to a driver profile
        '''
        db = next(get_db())
        controller_settings = crud.get_controller_settings(db, controller_settings.controllerId, controller_settings.driverId)

        return controller_settings

    async def create_controller_settings(db, controller_settings: schemas.LightControllerSettingsCreate):
        '''
        Create a settings profile for a light controller
        '''
        db = next(get_db())
        new_controller_settings = crud.create_controller_settings(db, controller_settings)

        return new_controller_settings

    async def create_controller(self, controller: schemas.LightControllerCreate):
        '''
        Create a new WLED light controller
        '''
        db = next(get_db())
        new_controller = crud.create_light_controller(db, controller)

        return new_controller

    async def update_controller(self, controller: schemas.LightControllerUpdate):
        '''
        Update controller information
        '''
        db = next(get_db())
        updated_controller = crud.update_light_controller(db, controller)

        return updated_controller

    async def delete_controller(self, controller: schemas.LightControllerDelete):
        '''
        Delete a light controller
        '''
        db = next(get_db())
        result = crud.delete_light_controller(db, controller)

        return result

    async def get_latest(self, raw=False):
        '''
        Get a snapshot of the latest iRacing data
        '''
        # Request data from the worker thread
        task = 'latest'
        if raw == True or raw == 'true':
            task = 'latest_raw'

        self.queue_manager.put('tasks', task)

        # Wait for data to be available in the queue, or timeout
        timeout = 5
        count = 0

        iracing_data = self.queue_manager.get('iracing_data_stream')

        while iracing_data is None and count < timeout:
            await asyncio.sleep(0.2)

            iracing_data = self.queue_manager.get('iracing_data_latest')
            count += 0.2

        # Return empty on timeout
        if not iracing_data:
            return {}
        
        return iracing_data

    async def data_stream(self, websocket: WebSocket):
        '''
        Stream current iRacing data continuously
        '''
        await self.ws_connection_manager.connect(websocket)

        try:
            while True:
                data = await self._get_iracing_data(raw=True)

                if data:
                    await self.ws_connection_manager.send_json(data, websocket)

                await asyncio.sleep(0.03)
        except (WebSocketDisconnect, ConnectionClosedError):
            self.ws_connection_manager.disconnect(websocket)
            return

    async def create_driver(self, driver: schemas.DriverCreate):
        '''
        Create a new driver
        '''
        db = next(get_db())
        new_driver = crud.create_driver(db, driver)

        return new_driver

    async def get_drivers(self, skip: int = 0, limit: int = 100):
        '''
        Get all drivers
        '''
        db = next(get_db())
        drivers = crud.get_drivers(db, skip=skip, limit=limit)

        return drivers

    async def update_driver(self, driver: schemas.DriverUpdate):
        '''
        Update driver information
        '''
        db = next(get_db())
        updated_driver = crud.update_driver(db, driver)

        return updated_driver

    async def delete_driver(self, driver: schemas.DriverDelete):
        '''
        Delete a driver
        '''
        db = next(get_db())
        result = crud.delete_driver(db, driver)

        return result

    async def get_active_driver(self):
        '''
        Get the active driver
        '''
        db = next(get_db())
        active_driver = crud.get_active_driver(db)

        return active_driver

    async def set_active_driver(self, driver: schemas.ActiveDriverCreate):
        '''
        Select the active driver
        '''
        db = next(get_db())
        crud.delete_active_driver(db)
        new_active_driver = crud.set_active_driver(db, driver)

        # Update worker threads
        self.queue_manager.put('active_driver', new_active_driver.driver)

        return new_active_driver

    async def get_scores(self, skip: int = 0, limit: int = 100):
        '''
        Get the current best lap times
        '''
        db = next(get_db())
        laptimes = crud.get_laptimes(db, skip=skip, limit=limit)

        return laptimes

    async def create_score(self, laptime: schemas.LapTimeCreate):
        '''
        Log a new lap time. Only gets commited if it's a high score.
        '''
        db = next(get_db())
        new_laptime = crud.create_laptime(db, laptime)

        return new_laptime

    async def get_quotes(self, skip: int = 0, limit: int = 100):
        '''
        Get all racing quotes
        '''
        db = next(get_db())
        quotes = crud.get_quotes(db, skip=skip, limit=limit)

        return quotes

    async def get_random_quote(self):
        '''
        Get a random racing quote
        '''
        db = next(get_db())
        quote = crud.get_random_quote(db)

        return quote

    async def create_quote(self, quote: schemas.QuoteCreate):
        '''
        Create a new quote
        '''
        db = next(get_db())
        new_quote = crud.create_quote(db, quote)

        return new_quote

    async def update_quote(self, quote: schemas.QuoteUpdate):
        '''
        Update a quote
        '''
        db = next(get_db())
        updated_quote = crud.update_quote(db, quote)

        return updated_quote

    async def delete_quote(self, quote: schemas.QuoteDelete):
        '''
        Delete a quote
        '''
        db = next(get_db())
        result = crud.delete_quote(db, quote)

        return result


    async def _get_iracing_data(self, raw=False):
        '''
        Helper function to retrieve iRacing data from Redis
        '''
        try:
            if raw:
                data = self.redis_store.hgetall('session_data_raw')
            else:
                data = self.redis_store.hgetall('session_data_raw')

            return data
        except redis.exceptions.ConnectionError:
            return {}
