"""
Common utility functions used throughout the API, namely access to the Redis
cache for real-time iRacing data and active driver changes
"""

from os import getenv
import redis
import json

from api.wsconnectionmanager import WebsocketConnectionManager
from database import schemas, iracingschemas, crud
from database.database import get_db
from database import models


def get_iracing_data():
    """
    Helper function to retrieve iRacing data from Redis
    """
    session_data = read_redis_key("session_data")

    if session_data.get("SessionTime"):
        return iracingschemas.IracingFrame(**session_data)

    return {}


def get_active_driver_from_cache():
    """
    Get the active driver from cache.
    Tries the Redis cache first. If it is empty, check the database.
    """
    redis_store = get_redis_store()

    try:
        active_driver_dict = json.loads(redis_store.get("active_driver"))
        active_driver = schemas.Driver(**active_driver_dict)
    except (redis.exceptions.ConnectionError, TypeError):
        db = next(get_db())
        active_driver_object = crud.get_active_driver(db)

        if active_driver_object:
            active_driver = active_driver_object.driver
        else:
            # No active driver, empty response
            return None

    return active_driver


def update_driver_cache(driver):
    """
    Helper function to update the active driver in the Redis cache
    """
    return set_redis_key("active_driver", schemas.Driver.from_orm(driver).json())


def get_session_best_lap():
    """
    Get the session best lap time from Redis
    """
    return read_redis_key("session_best_lap")


def set_session_best_lap(laptime: models.LapTime):
    """
    Update the session best lap time for streaming
    """
    return set_redis_key("session_best_lap", schemas.LapTime.from_orm(laptime).json())


def read_redis_key(key):
    """
    Helper function to read data from Redis
    """
    redis_store = get_redis_store()

    try:
        return json.loads(redis_store.get(key))
    except redis.exceptions.ConnectionError:
        print("Could not connect to Redis server")
        return None
    except TypeError:
        # Redis key does not exist
        return None


def subscribe_to_redis_key(key: str, callback):
    redis_store = get_redis_store()
    p = redis_store.pubsub()
    p.psubscribe(key)

    for msg in p.listen():
        if msg["type"] == "pmessage":
            callback(json.loads(msg["data"]))


def set_redis_key(key, value):
    """
    Helper function to set data in Redis
    """
    redis_store = get_redis_store()

    try:
        redis_store.set(key, value)
        return True
    except redis.exceptions.ConnectionError:
        print("Could not connect to Redis server")
        return False


def get_redis_store():
    """
    Get a connection to the Redis cache
    """
    return redis.Redis(
        host=getenv("REDIS_HOST", "127.0.0.1"), charset="utf-8", decode_responses=True
    )


def get_ws_manager():
    """
    Used to pass a websocket manager object to routers
    via dependency injection
    """
    return WebsocketConnectionManager()
