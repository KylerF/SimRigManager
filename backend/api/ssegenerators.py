from asyncio import sleep
from os import getenv
import redis
import json

from api.utils import get_iracing_data, get_session_best_lap


class SSEGenerators:
    def get_generator(request, event_type):
        """
        Factory method to get a new SSE generator function for a
        specific event
        """
        if event_type == "laptimes":
            return GeneratorFunctions(request=request).new_lap_time_generator()
        if event_type == "active_driver":
            return GeneratorFunctions(request=request).active_driver_generator()
        if event_type == "iracing":
            return GeneratorFunctions(request=request).iracing_generator()


class GeneratorFunctions:
    """"
    Server Sent Event generator functions
    """
    def __init__(self, request):
        self.request = request
        self.redis_store = redis.Redis(
            host=getenv("REDIS_HOST", "127.0.0.1"),
            charset="utf-8",
            decode_responses=True
        )

        # How often to update subscribers (seconds)
        self.update_period = 1

    async def new_lap_time_generator(self):
        """
        Send new lap times as they are set - used for a
        dynamic scoreboard
        """
        last_time = get_session_best_lap()

        while True:
            if await self.request.is_disconnected():
                break

            lap_time = get_session_best_lap()

            if lap_time:
                if not last_time or lap_time["id"] != last_time["id"]:
                    yield json.dumps(lap_time)
                    last_time = lap_time

            await sleep(self.update_period)

    async def active_driver_generator(self):
        """
        Send updates when the active driver changes
        """
        last_driver = {}

        while True:
            if await self.request.is_disconnected():
                break

            try:
                active_driver = json.loads(self.redis_store.get("active_driver")) or {}
            except (redis.exceptions.ConnectionError, TypeError):
                active_driver = {}

            if active_driver:
                if not last_driver or active_driver["id"] != last_driver["id"]:
                    yield json.dumps(active_driver)
                    last_driver = active_driver

            await sleep(self.update_period)

    async def iracing_generator(self):
        """
        Stream iRacing session data. This is also available via a websocket
        connection to /stream.
        """
        started = False

        while True:
            if await self.request.is_disconnected():
                break

            try:
                session_data = get_iracing_data()
            except (redis.exceptions.ConnectionError, TypeError):
                session_data = {}

            if session_data or not started:
                yield session_data
                started = True

            await sleep(self.update_period)
