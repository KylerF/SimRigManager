from starlette.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import FastAPI
from typing import List
from json import load
from os import path

from database.database import SessionLocal, engine, generate_database, get_db
from database import crud, models, schemas

class SimRigAPI:
    def __init__(self, data_queue):
        self.data_queue = data_queue

        # Load the metadata for documentation tags
        meta_path = path.dirname(path.realpath(__file__))
        tags_metadata = load(open(path.join(meta_path, 'tags_metadata.json')))

        # Set up the API
        self.api = FastAPI(
            title="SimRig Manager API", 
            openapi_tags=tags_metadata
        )

        self.api.add_middleware(
            CORSMiddleware,
            allow_origins=["*"], # Allows all origins
            allow_credentials=True,
            allow_methods=["*"], # Allows all methods
            allow_headers=["*"], # Allows all headers
        )


        # Register endpoints
        self.api.get("/", tags=["availability"])(self.get_root)

        self.api.get("/latest", tags=["iracing data"])(self.get_latest)

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

    async def get_latest(self):
        '''
        Get a snapshot of the latest iRacing data
        '''
        return {"is_on_track": False}

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
        self.data_queue.put(new_active_driver.driver)

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