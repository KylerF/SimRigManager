import asyncio
import logging
import ujson
import uuid

from api.utils import get_redis_store


class IracingSessionPlayer:
    """
    Module for playing back iRacing session data.
    This module fetches recorded session data from Redis and plays it back
    at different speeds, with pause and rewind functionality.
    """

    def __init__(self):
        self.session_id = uuid.uuid4().hex
        self.active = False
        self.paused = False
        self.speed = 1.0
        self.position = 0

        self.log = logging.getLogger(__name__)

    def play(self):
        """
        Start playback of the recorded session
        """
        self.active = True
        self.paused = False
        self.log.debug("Starting session playback")
        asyncio.run(self.__playback())

    def stop(self):
        """
        Stop playback of the recorded session
        """
        self.active = False
        self.log.debug("Stopped session playback")

    def pause(self):
        """
        Pause playback of the recorded session
        """
        self.paused = True
        self.log.debug("Paused session playback")

    def rewind(self):
        """
        Rewind playback of the recorded session
        """
        self.position = 0
        self.log.debug("Rewinded session playback")

    def set_speed(self, speed: float):
        """
        Set playback speed of the recorded session
        """
        self.speed = speed
        self.log.debug(f"Set playback speed to {speed}x")

    async def __playback(self):
        """
        Task to continuously fetch and play the session data from Redis
        """
        self.log.debug("Starting session playback")
        redis = get_redis_store()

        while self.active:
            if self.paused:
                await asyncio.sleep(0.1)
                continue

            session_data = redis.lrange(f"session-recorder-{self.session_id}", self.position, self.position)

            if session_data:
                iracing_data = ujson.loads(session_data[0])
                # Simulate the playback by setting the data in Redis
                redis.set("session_data", ujson.dumps(iracing_data))
                self.position += 1

            # Adjust the sleep time based on the playback speed
            await asyncio.sleep(1 / (30 * self.speed))
