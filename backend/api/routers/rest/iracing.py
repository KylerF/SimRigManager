from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Request
from websockets.exceptions import ConnectionClosedError, ConnectionClosedOK
from sse_starlette.sse import EventSourceResponse
import asyncio
import json

from api.utils import get_iracing_data, get_ws_manager
from api.ssegenerators import SSEGenerators

"""
Router to get iRacing data
"""
router = APIRouter(
    prefix="/iracing",
    tags=["iracing data"]
)


@router.get("/latest")
async def get_latest():
    """
    Get a snapshot of the latest iRacing data
    """
    return get_iracing_data()


@router.websocket("/stream")
async def ws_stream_iracing_data(
    websocket: WebSocket,
    ws_connection_manager=Depends(get_ws_manager)
):
    """
    Stream current iRacing data over a websocket connection.
    TODO Get framerate from user config.
    """
    data = {}
    sent_empty = False

    await ws_connection_manager.connect(websocket)

    try:
        while True:
            data = get_iracing_data()

            if data.SessionTime:
                # Only send if new data is available
                await ws_connection_manager.send_json(json.loads(data.json()), websocket)
                sent_empty = False
            else:
                # Send one empty frame to update the client
                if not sent_empty:
                    await ws_connection_manager.send_json({}, websocket)
                    sent_empty = True

                await asyncio.sleep(1)
                continue

            await asyncio.sleep(0.03)
    except (
        WebSocketDisconnect,
        ConnectionClosedError,
        ConnectionClosedOK,
        RuntimeError
    ):
        await ws_connection_manager.disconnect(websocket)
        return


@router.get("/stream")
async def stream_iracing_data(request: Request):
    """
    Stream iracing data via server sent events. This endpoint also
    supports websocket connections.
    """
    event_generator = SSEGenerators.get_generator(request, "iracing")
    return EventSourceResponse(event_generator)
