from fastapi import APIRouter, Request
from sse_starlette.sse import EventSourceResponse
from typing import List

from api.ssegenerators import SSEGenerators
from api.utils import set_session_best_lap
from database.database import get_db
from database import crud, schemas

"""
Router to the lap times endpoint to get and set high scores
"""
router = APIRouter(
    prefix="/laptimes",
    tags=["laptimes"]
)

@router.get("", response_model=List[schemas.LapTime])
async def get_scores(skip: int = 0, limit: int = -1):
    """
    Get the current best lap times
    """
    db = next(get_db())
    laptimes = crud.get_laptimes(db, skip=skip, limit=limit)

    return laptimes

@router.post("", response_model=schemas.LapTime)
async def create_score(laptime: schemas.LapTimeCreate):
    """
    Log a new lap time. Only gets commited if it's a personal best.
    """
    db = next(get_db())
    new_laptime = crud.create_laptime(db, laptime)

    # Update redis key for streaming
    set_session_best_lap(new_laptime)

    return new_laptime

@router.get("/stream", response_model=schemas.LapTime)
async def stream_lap_times(request: Request):
    """
    Stream new lap times via server sent events
    """
    event_generator = SSEGenerators.get_generator(request, "laptimes")
    return EventSourceResponse(event_generator)
