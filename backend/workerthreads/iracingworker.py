from time import sleep
import threading
import math

from database.schemas import DriverUpdate, LapTimeCreate
from database.database import get_db
from database import crud

class IracingWorker(threading.Thread):
    '''
    Background worker to collect and log iRacing data, and send updates
    to WLED light controllers in response to changes
    '''
    def __init__(self, queue_manager, logger, data_stream, controller, rpm_strip, framerate):
        threading.Thread.__init__(self)
        self.threadID = 1
        self.name = 'iRacing Worker Thread'
        self.active = True

        self.queue_manager = queue_manager
        self.log = logger
        self.data_stream = data_stream
        self.controller = controller
        self.rpm_strip = rpm_strip
        self.framerate = framerate

    def run(self):
        # Get the active driver and their track time from the database
        db = next(get_db())
        active_driver_object = crud.get_active_driver(db)
        active_driver = None
        best_lap_time = 0
        track_time = 0

        if active_driver_object:
            active_driver = active_driver_object.driver
            track_time = active_driver.trackTime
            self.log.info('Logging data for ' + active_driver.name)
        else:
            self.log.info('No driver selected. Lap times will not be recorded.')

        # Continue parsing data until ordered to stop
        while self.active:
            try:
                # Get data from the stream
                latest = self.data_stream.latest()

                # Check for updates from the API
                updated_driver = self.queue_manager.get('active_driver')
                pending_task = self.queue_manager.get('tasks')
                
                if updated_driver:
                    active_driver = updated_driver
                    track_time = updated_driver.trackTime

                    self.log.info('Setting active driver to ' + active_driver.name)

                if pending_task == 'latest':
                    self.queue_manager.put('iracing_data', latest)
                if pending_task == 'latest_raw':
                    raw_data = self.data_stream.latest(raw=True)
                    self.queue_manager.put('iracing_data', raw_data)

                if not self.data_stream.is_active or not latest['is_on_track']:
                    best_lap_time = 0
                    
                    # Update the driver's track time
                    if active_driver and active_driver.trackTime < math.floor(track_time):
                        self.log.info('Updating track time for ' + active_driver.name)
                        active_driver = crud.update_driver(db, DriverUpdate(
                            id=active_driver.id, 
                            trackTime=track_time
                        ))

                    # Stop the stream and wait
                    if self.controller.is_connected:
                        self.controller.stop()
                        self.log.info('iRacing data lost - waiting')

                    self.data_stream.restart()
                    sleep(1)

                    continue
                else:
                    # Re-establish connection
                    if not self.controller.is_connected:
                        self.log.info('Reconnecting')
                        self.controller.reconnect()

                # Check for car swaps
                if self.rpm_strip.redline != latest['redline']:
                    self.rpm_strip.set_redline(latest['redline'])
                    self.log.debug('Setting redline to new value: ' + str(latest['redline']))
                if self.rpm_strip.idle_rpm != latest['idle_rpm']:
                    self.rpm_strip.set_idle_rpm(latest['idle_rpm'])
                    self.log.debug('Setting idle RPM to new value: ' + str(latest['idle_rpm']))
                    
                # Get the RPM and update the light controller
                self.rpm_strip.set_rpm(latest['rpm'])
                self.controller.update(self.rpm_strip.to_color_list())

                # Log the best lap time
                if latest['best_lap_time'] > 0 and (best_lap_time == 0 or latest['best_lap_time'] < best_lap_time):
                    best_lap_time = latest['best_lap_time']

                    if active_driver:
                        self.log.info('Setting new best lap time for ' + active_driver.name)
                        
                        crud.create_laptime(db, LapTimeCreate(
                            car=latest['car_name'], 
                            trackName=latest['track_name'], 
                            trackConfig=latest['track_config'] or '', 
                            time=latest['best_lap_time'], 
                            driverId=active_driver.id
                        ))
                        
                self.log.debug(latest)
                
                track_time += 1/self.framerate

                sleep(1/self.framerate)
            except KeyboardInterrupt:
                self.log.info('Keyboard interrupt received - exiting')
                self.stop()
            except KeyError:
                self.log.error('Required data not found - stopping iRacing stream')
                self.data_stream.stop()
            except ConnectionResetError:
                self.log.error('iRacing refused connection')
                self.data_stream.stop()
            except Exception:
                self.log.exception('Unhandled condition')
                self.data_stream.stop()

    def stop(self):
        '''
        Disconnect from iRacing and stop this thread
        '''
        self.active = False
