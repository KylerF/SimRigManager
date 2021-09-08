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

    snapshot_file = 'latest.yaml'

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
            self.is_active = True
            self.get_startup_info()

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
                    'rpm': math.floor(self.ir['RPM'] if self.ir['RPM'] != 300.0 else 0), 
                    'gear': self.ir['Gear'], 
                    'is_on_track': self.ir['IsOnTrack'], 
                    'incident_count': self.ir['PlayerCarMyIncidentCount'], 
                    'best_lap_time': self.ir['LapBestLapTime'], 
                    'session_time': self.ir['SessionTime']
                })

                # Fix redline RPM if needed
                if self.state['redline'] < self.state['rpm']:
                    self.state['redline'] = self.state['rpm']
                
            except (KeyError, AttributeError, TypeError):
                self.stop()
                return
                
            self.is_active = True

    def latest(self, raw=False):
        '''
        Get and return all the latest iRacing data
        '''
        if raw:
            return self.__get_latest_raw()

        self.update()
        return self.state

    def __get_latest_raw(self):
        '''
        Get a raw iRacing data snapshot (all attributes, unfiltered)
        '''
        raw_data = {}

        if not self.is_active:
            return raw_data
        
        vars = self.ir._var_headers_dict

        for var in vars:
            raw_data[var] = self.ir[var]

        # Add missing headers
        raw_data['WeekendInfo'] = self.ir['WeekendInfo']
        raw_data['DriverInfo'] = self.ir['DriverInfo']

        return raw_data

    def save_latest_to_yaml(self):
        '''
        Save the latest raw iRacing data to a YAML file
        '''
        if not self.ir:
            return False

        self.ir.parse_to(self.snapshot_file)

        return True
    