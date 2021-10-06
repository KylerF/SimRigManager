from asyncio import sleep
from os import getenv
import redis
import json

class SSEGenerators:
    """
    Factory method to get a new SSE generator function for a 
    specific event
    """
    def get_generator(request, event_type):
        if event_type == "laptimes":
            return GeneratorFunctions(request=request).newLapTimeGenerator()
        if event_type == "active_driver":
            return GeneratorFunctions(request=request).activeDriverGenerator()


class GeneratorFunctions:
    """"
    Server Sent Event generator functions
    """
    def __init__(self, request):
        self.request = request
        self.redis_store = redis.Redis(host=getenv("REDIS_HOST", "127.0.0.1"), charset="utf-8", decode_responses=True)

        # How often to update subscribers (seconds)
        self.update_period = 1

    async def newLapTimeGenerator(self):
        """
        Send new lap times as they are set - used for a
        dynamic scoreboard
        """
        last_time = {}

        while True:
            if await self.request.is_disconnected():
                break

            try:
                lap_time = json.loads(self.redis_store.get("session_best_lap")) or {}
            except (redis.exceptions.ConnectionError, TypeError):
                lap_time = {}

            if lap_time:
                if not last_time or lap_time["id"] != last_time["id"]:
                    yield json.dumps(lap_time)
                    last_time = lap_time

            await sleep(self.update_period)

    async def activeDriverGenerator(self):
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
        