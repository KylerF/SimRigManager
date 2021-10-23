from sse_starlette.sse import EventSourceResponse
from api.ssegenerators import SSEGenerators
from starlette.responses import Response
from starlette.status import HTTP_200_OK
from fastapi import APIRouter
from fastapi import Request
from typing import List

from api.utils import update_driver_cache, get_active_driver_from_cache
from database.database import get_db
from database import crud, schemas
from collections import Counter

"""
Router to manage driver profiles, sign in and get driver stats
"""
router = APIRouter(
    prefix="/drivers",
    tags=["drivers"]
)

@router.get("", response_model=List[schemas.Driver])
async def get_drivers(skip: int = 0, limit: int = -1):
    """
    Get all drivers
    """
    db = next(get_db())
    drivers = crud.get_drivers(db, skip=skip, limit=limit)

    return drivers

@router.post("", response_model=schemas.Driver)
async def create_driver(driver: schemas.DriverCreate):
    """
    Create a new driver
    """
    db = next(get_db())
    new_driver = crud.create_driver(db, driver)

    return new_driver

@router.patch("", response_model=schemas.Driver)
async def update_driver(driver: schemas.DriverUpdate):
    """
    Update driver information
    """
    db = next(get_db())
    updated_driver = crud.update_driver(db, driver)

    update_driver_cache(updated_driver)

    return updated_driver

@router.delete("/{driver_id}", response_model=schemas.Driver)
async def delete_driver(driver_id: int):
    """
    Delete a driver
    """
    db = next(get_db())
    result = crud.delete_driver_by_id(db, driver_id)

    return result

@router.get("/active", response_model=schemas.Driver)
async def get_active_driver():
    """
    Get the active driver, checking for a cached driver in the Redis
    store first. If there is no driver cached, try the database.
    """
    active_driver = get_active_driver_from_cache()

    if not active_driver:
        # No active driver, empty response
        return Response(status_code=HTTP_200_OK)

    return active_driver

@router.get("/active/stream")
async def stream_active_driver(request: Request):
    """
    Stream active driver changes via server sent events
    """
    event_generator = SSEGenerators.get_generator(request, "active_driver")
    return EventSourceResponse(event_generator)

@router.get("/{driver_id}/stats")
async def get_driver_stats(driver_id: int):
    """
    Get overall stats for a driver:
        - Track time
        - Records held
        - Track with most records
        - TODO laps turned, max speed, favorite tracks
    """
    db = next(get_db())
    track_time = crud.get_driver_by_id(db, driver_id).trackTime
    laptimes = [
        time for time in crud.get_laptimes(db) 
        if time.driverId == driver_id
    ]
    records_held = len(laptimes)
    track_map = Counter(getattr(time, 'trackName') for time in laptimes)
    favorite_track = ""
    
    if track_map:
        favorite_track = max(track_map, key=track_map.get)

    return schemas.DriverStats(**{
        "trackTime": track_time, 
        "recordsHeld": records_held, 
        "favoriteTrack": favorite_track
    })
