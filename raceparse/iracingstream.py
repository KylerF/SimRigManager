import irsdk
import math

class IracingStream:
    is_active = False
    state = {}

    @staticmethod
    def get_stream(test_file=None):
        stream = IracingStream()
        stream.start(test_file)
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

    def update(self):
        if self.ir:
            if not (self.ir.is_initialized and self.ir.is_connected):
                self.active = False
                return
            
            try:
                self.state = {
                    'speed': math.floor(self.ir['Speed']*2.236936), 
                    'rpm': math.floor(self.ir['RPM']), 
                    'idle_rpm': math.floor(self.ir['DriverInfo']['DriverCarIdleRPM']), 
                    'redline': math.floor(self.ir['DriverInfo']['DriverCarRedLine']), 
                    'gear': self.ir['Gear'], 
                    'is_on_track': self.ir['IsOnTrack'], 
                }
            except (AttributeError, TypeError):
                self.active = False
                self.state = {}
                return
                
            self.is_active = True

    def latest(self):
        self.update()
        return self.state
