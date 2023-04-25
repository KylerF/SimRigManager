from api.utils import (
    get_iracing_data,
    get_redis_store
)

import logging
import asyncio
import ujson
import uuid


class IracingSessionRecorder():
    """
    Module for recording iRacing session data.
    Since the iRacing worker thread is constantly updating the session data in Redis,
    this module only needs to read the data from Redis and write it to the file using
    a second key as a buffer.
    """

    def __init__(self):
        self.session_id = uuid.uuid4().hex
        self.active = True

        self.log = logging.getLogger(__name__)

    def start(self, fps: int = 30):
        """
        Start the session recording
        """
        self.fps = fps
        self.log.debug("Starting session recorder")
        asyncio.run(self.__record())

    def stop(self):
        """
        Stop the session recording
        """
        self.active = False
        self.log.debug("Stopped session recording")

    async def __record(self):
        """
        Task to continuously read the session data from Redis
        """
        self.log.debug("Starting session recording")
        redis = get_redis_store()

        while self.active:
            iracing_data = get_iracing_data()

            if iracing_data:
                # Append the data to the session-recorder key
                redis.rpush(f"session-recorder-{self.session_id}", ujson.dumps(iracing_data.dict()))

            # Capture 30 frames per second
            await asyncio.sleep(1/30)
