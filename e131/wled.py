import sacn
import math

class Wled:
    @staticmethod
    def connect(ip, universe):
        wled = Wled()
        wled.ip = ip
        wled.universe = universe
        wled.reconnect()

        return wled

    def stop(self):
        if self.sender:
            self.sender.deactivate_output(1)
            self.sender.stop()
            self.sender = None

    def reconnect(self):
        self.sender = sacn.sACNsender()
        self.sender.start()
        self.sender.activate_output(self.universe)
        self.sender[self.universe].destination = self.ip

    def update(self, color_list):
        data = []
        
        for color in color_list:
            data.append(math.floor(color.rgb[0] * 255))
            data.append(math.floor(color.rgb[1] * 255))
            data.append(math.floor(color.rgb[2] * 255))

        self.sender[1].dmx_data = tuple(data)
