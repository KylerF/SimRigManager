from redis.exceptions import ConnectionError
from time import sleep
import threading
import logging
import serial
import math
import json

from api.utils import set_redis_key, get_active_driver_from_cache
from database.schemas import DriverUpdate, LapTimeCreate
from database.database import get_db
from database import crud, schemas


class IracingWorker(threading.Thread):
    """
    Background worker to collect and log iRacing data, and send updates
    to WLED light controllers in response to changes
    """

    def __init__(self, data_stream, controller, rpm_strip, framerate):
        threading.Thread.__init__(self)
        self.threadID = 1
        self.name = "iRacing Worker Thread"
        self.active = True

        self.data_stream = data_stream
        self.controller = controller
        self.rpm_strip = rpm_strip
        self.framerate = framerate

        self.db = None
        self.active_driver = None
        self.latest = None
        self.track_name = None
        self.best_lap_time = 0
        self.session_id = None

        self.log = logging.getLogger(__name__)

    def run(self):
        # Get the active driver and their track time
        self.db = next(get_db())
        active_driver_object = crud.get_active_driver(self.db)
        self.active_driver = None
        track_time = 0

        if active_driver_object:
            self.active_driver = active_driver_object.driver
            track_time = self.active_driver.trackTime
            self.log.info("Logging data for " + self.active_driver.name)
        else:
            self.log.info("No driver selected. Lap times will not be recorded.")

        # Continue parsing data until ordered to stop
        while self.active:
            try:
                # Get data from the stream
                self.latest = self.data_stream.latest()
                latest_raw = self.data_stream.latest(raw=True)

                # Update Redis keys
                set_redis_key("session_data", json.dumps(latest_raw))

                # Check for updates from the API
                updated_driver = get_active_driver_from_cache()

                if updated_driver and updated_driver != self.active_driver:
                    self.active_driver = updated_driver
                    track_time = updated_driver.trackTime

                    self.log.info("Setting active driver to " + self.active_driver.name)

                if not self.data_stream.is_active or not self.latest["is_on_track"]:
                    # Update the driver's track time
                    if (
                        self.active_driver
                        and self.active_driver.trackTime < math.floor(track_time)
                    ):
                        self.log.info(
                            "Updating track time for " + self.active_driver.name
                        )
                        self.active_driver = crud.update_driver(
                            self.db,
                            DriverUpdate(
                                id=self.active_driver.id,
                                trackTime=math.floor(track_time),
                            ),
                        )

                    # Stop the stream and wait
                    if self.controller.is_connected:
                        self.controller.stop()
                        self.log.info("iRacing data lost - waiting")

                    self.data_stream.restart()
                    sleep(1)

                    continue
                else:
                    # Re-establish connection
                    if not self.controller.is_connected:
                        self.log.info("Reconnecting")
                        self.controller.reconnect()

                # Check for car swaps
                if self.rpm_strip.redline != self.latest["redline"]:
                    self.rpm_strip.set_redline(self.latest["redline"])
                    self.log.debug(
                        "Setting redline to new value: " + str(self.latest["redline"])
                    )
                if self.rpm_strip.idle_rpm != self.latest["idle_rpm"]:
                    self.rpm_strip.set_idle_rpm(self.latest["idle_rpm"])
                    self.log.debug(
                        "Setting idle RPM to new value: " + str(self.latest["idle_rpm"])
                    )

                # Get the RPM and update the light controller
                self.rpm_strip.set_rpm(self.latest["rpm"])
                self.controller.update(self.rpm_strip.to_color_list())

                # Get speed/RPM and update the OLED display
                s = serial.Serial("COM17")
                msg = f"iracing,speed,{self.latest["speed"]},rpm,{self.latest["rpm"]}\r\n"
                s.write(str.encode(msg))

                # Check for a new session
                session_id = self.latest["session_id"]
                if session_id != session_id:
                    self.best_lap_time = 0
                self.session_id = session_id

                # Log the best lap time
                self.__set_best_time()

                self.log.debug(self.latest)

                track_time += 1 / self.framerate

                sleep(1 / self.framerate)
            except KeyboardInterrupt:
                self.log.info("Keyboard interrupt received - exiting")
                self.stop()
            except KeyError:
                self.log.error("Required data not found - stopping iRacing stream")
                self.data_stream.stop()
            except ConnectionResetError:
                self.log.error("iRacing refused connection")
                self.data_stream.stop()
            except ConnectionError:
                self.log.error("Redis server refused connection")
            except Exception:
                self.log.exception("Unhandled exception")
                self.data_stream.stop()
                self.db.close()

        self.db.close()

    def stop(self):
        """
        Disconnect from iRacing and stop this thread
        """
        self.active = False

    def __set_best_time(self):
        if self.latest["best_lap_time"] > 0 and (
            self.best_lap_time == 0 or self.latest["best_lap_time"] < self.best_lap_time
        ):
            self.best_lap_time = self.latest["best_lap_time"]

            if self.active_driver:
                self.log.info(
                    "Setting new best lap time for " + self.active_driver.name
                )

                new_record = LapTimeCreate(
                    car=self.latest["car_name"],
                    trackName=self.latest["track_name"],
                    trackConfig=self.latest["track_config"] or "",
                    time=self.latest["best_lap_time"],
                    driverId=self.active_driver.id,
                )

                new_laptime = crud.create_laptime(self.db, new_record)

                # Update Redis key for streaming
                if new_laptime:
                    set_redis_key(
                        "session_best_lap",
                        schemas.LapTime.from_orm(new_laptime).json()
                    )
