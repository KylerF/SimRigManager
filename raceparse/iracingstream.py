import irsdk
import math

class IracingStream:
    state = {}

    @staticmethod
    def get_stream(test_file=None):
        stream = IracingStream()
        stream.start(test_file)

        return stream

    def start(self, test_file=None):
        self.ir = irsdk.IRSDK()

        if test_file:
            self.ir.startup(test_file)
        else:
            self.ir.startup()

    def stop(self):
        self.ir.shutdown()
        self.ir = None

    def is_active(self):
        try:
            return self.ir['RPM'] != None
        except AttributeError:
            return False

    def update(self):
        if self.ir and self.is_active():
            self.state = {
                'speed': math.floor(self.ir['Speed']*2.236936), 
                'rpm': math.floor(self.ir['RPM']), 
                'idle_rpm': math.floor(self.ir['DriverInfo']['DriverCarIdleRPM']), 
                'redline': math.floor(self.ir['DriverInfo']['DriverCarRedLine']), 
                'gear': self.ir['Gear']
            }

    def latest(self, next=True):
        if next:
            self.update()
        
        return self.state
