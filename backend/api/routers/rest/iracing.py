from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends, Request
from websockets.exceptions import ConnectionClosedError, ConnectionClosedOK
from sse_starlette.sse import EventSourceResponse
import asyncio
import json

from api.utils import get_iracing_data, get_ws_manager
from api.ssegenerators import SSEGenerators
from recorder.session_recorder import IracingSessionRecorder
from recorder.session_player import IracingSessionPlayer

"""
Router to get iRacing data
"""
router = APIRouter(prefix="/iracing", tags=["iracing data"])


@router.get("/latest")
async def get_latest():
    """
    Get a snapshot of the latest iRacing data
    """
    return get_iracing_data()


@router.websocket("/stream")
async def ws_stream_iracing_data(
    websocket: WebSocket, ws_connection_manager=Depends(get_ws_manager)
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

            if data and data.SessionTime:
                # Only send if new data is available
                await ws_connection_manager.send_json(
                    json.loads(data.json()), websocket
                )
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
        RuntimeError,
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


@router.post("/record/start")
async def start_recording():
    """
    Start recording the iRacing session
    """
    recorder = IracingSessionRecorder()
    recorder.start()
    return {"status": "recording started"}


@router.post("/record/stop")
async def stop_recording():
    """
    Stop recording the iRacing session
    """
    recorder = IracingSessionRecorder()
    recorder.stop()
    return {"status": "recording stopped"}


@router.post("/playback/start")
async def start_playback():
    """
    Start playback of the recorded iRacing session
    """
    player = IracingSessionPlayer()
    player.play()
    return {"status": "playback started"}


@router.post("/playback/stop")
async def stop_playback():
    """
    Stop playback of the recorded iRacing session
    """
    player = IracingSessionPlayer()
    player.stop()
    return {"status": "playback stopped"}


@router.post("/playback/pause")
async def pause_playback():
    """
    Pause playback of the recorded iRacing session
    """
    player = IracingSessionPlayer()
    player.pause()
    return {"status": "playback paused"}


@router.post("/playback/rewind")
async def rewind_playback():
    """
    Rewind playback of the recorded iRacing session
    """
    player = IracingSessionPlayer()
    player.rewind()
    return {"status": "playback rewinded"}


@router.post("/playback/speed")
async def set_playback_speed(speed: float):
    """
    Set playback speed of the recorded iRacing session
    """
    player = IracingSessionPlayer()
    player.set_speed(speed)
    return {"status": f"playback speed set to {speed}x"}
