import irsdk
import math

class IracingStream:
    driver_index = 0
    is_active = False
    state = {}

    @staticmethod
    def get_stream(test_file=None):
        stream = IracingStream()
        stream.start(test_file)
        stream.get_startup_info()
        stream.update()

        return stream

    def start(self, test_file=None):
        self.ir = irsdk.IRSDK()

        if test_file:
            self.ir.startup(test_file)
        else:
            self.ir.startup()

        if self.ir.is_initialized and self.ir.is_connected:
            self.is_active = True

    def stop(self):
        if self.ir:
            self.ir.shutdown()

        self.is_active = False
        self.ir = None
        self.state = {}
        
    def restart(self):
        self.stop()
        self.start()

    def get_startup_info(self):
        if self.ir:
            if not (self.ir.is_initialized and self.ir.is_connected):
                self.active = False
                return
        
        try:
            self.driver_index = self.ir['DriverInfo']['DriverCarIdx']

            self.state.update({
                'driver_index': self.driver_index, 
                'idle_rpm': math.floor(self.ir['DriverInfo']['DriverCarIdleRPM']), 
                'redline': math.floor(self.ir['DriverInfo']['DriverCarRedLine']), 
                'event_type': self.ir['WeekendInfo']['EventType'], 
                'car_name': self.ir['DriverInfo']['Drivers'][self.driver_index]['CarScreenName'], 
                'track_name': self.ir['WeekendInfo']['TrackDisplayName'], 
                'track_config': self.ir['WeekendInfo']['TrackConfigName'] 
            })
        except (KeyError, AttributeError, TypeError):
            self.active = False
            self.state = {}
            return

    def update(self):
        if self.ir:
            if not (self.ir.is_initialized and self.ir.is_connected):
                self.active = False
                return
            
            try:
                # TODO: Check whether driverinfo vars are updated
                self.state.update ({
                    'speed': math.floor(self.ir['Speed']*2.236936), 
                    'rpm': math.floor(self.ir['RPM']), 
                    'gear': self.ir['Gear'], 
                    'is_on_track': self.ir['IsOnTrack'], 
                    'incident_count': self.ir['PlayerCarMyIncidentCount'], 
                    'best_lap_time': self.ir['LapBestLapTime']
                })
            except (KeyError, AttributeError, TypeError):
                self.active = False
                self.state = {}
                return
                
            self.is_active = True

    def latest(self):
        self.update()
        return self.state
