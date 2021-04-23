from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List

from database.database import SessionLocal, engine, generate_database
from database import crud, models, schemas

class SimRigAPI:
    def __init__(self):
        # Set up the database
        generate_database()
        models.Base.metadata.create_all(bind=engine)

        # Set up the API
        self.api = FastAPI(
            title="SimRig Manager API"
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
        self.api.get("/activedriver", tags=["drivers"])(self.get_active_driver)
        self.api.get("/scores", tags=["scores"], response_model=List[schemas.LapTime])(self.get_scores)
        self.api.post("/scores", tags=["scores"], response_model=schemas.LapTime)(self.create_score)
        self.api.get("/controllers", tags=["controllers"], response_model=List[schemas.LightController])(self.get_controllers)
        self.api.post("/controllers", tags=["controllers"], response_model=schemas.LightController)(self.create_controller)
        self.api.patch("/controllers", tags=["controllers"], response_model=schemas.LightController)(self.update_controller)
        self.api.delete("/controllers", tags=["controllers"], response_model=schemas.LightController)(self.delete_controller)

    async def get_root(self):
        '''
        Availability check 
        '''
        return {"active": True}

    async def get_controllers(self, skip: int = 0, limit: int = 100):
        '''
        Get all WLED light controllers
        '''
        db = next(self.get_db())
        controllers = crud.get_light_controllers(db, skip=skip, limit=limit)

        return controllers

    async def create_controller(self, controller: schemas.LightControllerCreate):
        '''
        Create a new WLED light controller
        '''
        db = next(self.get_db())
        new_controller = crud.create_light_controller(db, controller)

        return new_controller

    async def update_controller(self, controller: schemas.LightControllerUpdate):
        '''
        Update controller information
        '''
        db = next(self.get_db())
        updated_controller = crud.update_light_controller(db, controller)

        return updated_controller

    async def delete_controller(self, controller: schemas.LightControllerDelete):
        '''
        Delete a light controller
        '''
        db = next(self.get_db())
        result = crud.delete_light_controller(db, controller)

        return result

    async def get_latest(self):
        '''
        Get a snapshot of the latest iRacing data
        '''
        return {"is_on_track": False}

    async def get_drivers(self, skip: int = 0, limit: int = 100):
        '''
        Get all drivers
        '''
        db = next(self.get_db())
        drivers = crud.get_drivers(db, skip=skip, limit=limit)

        return drivers

    async def update_driver(self, driver: schemas.DriverUpdate):
        '''
        Update driver information
        '''
        db = next(self.get_db())
        updated_driver = crud.update_driver(db, driver)

        return updated_driver

    async def delete_driver(self, driver: schemas.DriverDelete):
        '''
        Delete a driver
        '''
        db = next(self.get_db())
        result = crud.delete_driver(db, driver)

        return result

    async def get_active_driver(self):
        '''
        Get the active driver
        '''
        return { 'id': 3, 'name': 'Roger', 'nickname': 'Slayer', 'trackTime': 120000, 'profilePic': '' }

    async def create_driver(self, driver: schemas.DriverCreate):
        '''
        Create a new driver
        '''
        db = next(self.get_db())
        new_driver = crud.create_driver(db, driver)

        return new_driver

    async def get_scores(self, skip: int = 0, limit: int = 100):
        '''
        Get the current best lap times
        '''
        db = next(self.get_db())
        laptimes = crud.get_laptimes(db, skip=skip, limit=limit)

        return laptimes

    async def create_score(self, laptime: schemas.LapTimeCreate):
        '''
        Log a new lap time
        '''
        db = next(self.get_db())
        new_laptime = crud.create_laptime(db, laptime)

        return new_laptime

    def get_db(self):
        '''
        Dependency - get a database connection
        '''
        db = SessionLocal()

        try:
            yield db
        finally:
            db.close()
