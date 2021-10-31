from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from os import path, getenv
import redis
import json

from database.database import get_db
from database import crud, schemas
from api.routers import (
    controllers, 
    laptimes, 
    avatars, 
    drivers, 
    iracing,
    quotes,
)

class SimRigAPI:
    """
    Provides the API routes and methods to interact with the entire application
    """
    def __init__(self, queue_manager, logger):
        self.queue_manager = queue_manager
        self.log = logger

        # Load the metadata for documentation tags
        meta_path = path.dirname(path.realpath(__file__))
        tags_metadata = json.load(
            open(
                path.join(
                    meta_path, "tags_metadata.json"
                )
            )
        )

        # Connect to Redis
        self.redis_store = self.get_redis_store()

        # Set up the API
        self.api = FastAPI(
            title="SimRig Manager API", 
            openapi_tags=tags_metadata
        )

        # Configure CORS
        self.api.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

        # Register root endpoint
        self.api.get(
            "/", 
            response_model=schemas.Availability, 
            tags=["availability"]
        )(
            self.get_root
        )

        # Register routers
        self.api.include_router(avatars.router)
        self.api.include_router(controllers.router)
        self.api.include_router(drivers.router)
        self.api.include_router(iracing.router)
        self.api.include_router(laptimes.router)
        self.api.include_router(quotes.router)

        self.api.post("/drivers/active", tags=["drivers"], response_model=schemas.Driver)(self.set_active_driver)

    async def get_root(self):
        """
        Availability check 
        """
        return {"active": True}

    def get_redis_store(self):
        """
        Provides a connection to Redis to API routers
        """
        return redis.Redis(
            host=getenv("REDIS_HOST", "127.0.0.1"), 
            charset="utf-8", 
            decode_responses=True
        )

    async def set_active_driver(self, driver: schemas.ActiveDriverCreate):
        """
        Select the active driver
        """
        db = next(get_db())
        crud.delete_active_driver(db)
        new_active_driver = crud.set_active_driver(db, driver)
        self.queue_manager.put("active_driver", new_active_driver.driver)

        # Update cache for worker threads
        self.__update_driver_cache(new_active_driver.driver)

        return new_active_driver.driver

    def __update_driver_cache(self, driver):
        """
        Helper function to update the active driver in the Redis cache
        """
        try:
            self.redis_store.set(
                "active_driver", 
                schemas.Driver(**driver.__dict__).json()
            )
            return True
        except redis.exceptions.ConnectionError:
            self.log.error("Could not connect to Redis server")
            return False
