import irsdk
import math

class IracingStream:
    is_active = False
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

        self.is_active = True

    def stop(self):
        self.ir.shutdown()
        self.is_active = False
        self.ir = None

    def update(self):
        if self.ir:
            try:
                self.state = {
                    'speed': math.floor(self.ir['Speed']*2.236936), 
                    'rpm': math.floor(self.ir['RPM']), 
                    'idle_rpm': math.floor(self.ir['DriverInfo']['DriverCarIdleRPM']), 
                    'redline': math.floor(self.ir['DriverInfo']['DriverCarRedLine']), 
                    'gear': self.ir['Gear']
                }
            except (AttributeError, TypeError) as e:
                self.is_active = False
                return

        self.is_active = True

    def latest(self, next=True):
        if next:
            self.update()
        
        return self.state
