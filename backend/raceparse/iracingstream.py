import irsdk
import math

class IracingStream:
    '''
    Collects and organizes data from iRacing
    '''
    driver_index = 0
    last_session_time = 0
    is_active = False
    state = {}

    @staticmethod
    def get_stream(test_file=None):
        '''
        Tries to connect to iRacing and returns a ready-to-use stream
        '''
        stream = IracingStream()
        stream.start(test_file)
        stream.get_startup_info()
        stream.update()

        return stream

    def start(self, test_file=None):
        '''
        Connect to iRacing and start streaming data
        '''
        self.ir = irsdk.IRSDK()

        if test_file:
            self.ir.startup(test_file)
        else:
            self.ir.startup()

        if self.ir.is_initialized and self.ir.is_connected:
            self.get_startup_info()
            self.is_active = True

    def stop(self):
        '''
        Stop the stream
        '''
        if self.ir:
            self.ir.shutdown()

        self.is_active = False
        self.ir = None
        self.state = {}
        
    def restart(self):
        '''
        Restart the stream
        '''
        self.stop()
        self.start()

    def get_startup_info(self):
        '''
        Get the data that is set once per session
        '''
        if self.ir:
            if not (self.ir.is_initialized and self.ir.is_connected):
                self.stop()
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
            self.stop()
            return

    def update(self):
        '''
        Update the stream with the latest iRacing data
        '''
        if self.ir:
            if not (self.ir.is_initialized and self.ir.is_connected):
                self.stop()
                return
            
            try:
                self.state.update ({
                    'speed': math.floor(self.ir['Speed']*2.236936), 
                    'rpm': math.floor(self.ir['RPM']), 
                    'gear': self.ir['Gear'], 
                    'is_on_track': self.ir['IsOnTrack'], 
                    'incident_count': self.ir['PlayerCarMyIncidentCount'], 
                    'best_lap_time': self.ir['LapBestLapTime'], 
                    'session_time': self.ir['SessionTime']
                })
            except (KeyError, AttributeError, TypeError):
                self.stop()
                return
                
            self.is_active = True

    def latest(self):
        '''
        Get and return all the latest iRacing data
        '''
        self.update()
        return self.state
