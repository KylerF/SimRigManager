from starlette.responses import Response
from starlette.status import HTTP_200_OK
from fastapi import APIRouter

"""
Router to the Events API
External services can use this API to notify the system of events, such as:
    - Driver detected in seat
"""
router = APIRouter(prefix="/events", tags=["events"])


@router.post("")
async def notify_of_event(event):
    """
    Register the event in Redis
    """
    return Response(HTTP_200_OK)
