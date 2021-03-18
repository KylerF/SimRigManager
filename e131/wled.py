import sacn
import math

class Wled:
    @staticmethod
    def connect(ip, universe):
        wled = Wled()
        wled.sender = sacn.sACNsender()
        wled.sender.start()
        wled.sender.activate_output(universe)
        wled.sender[universe].destination = ip

        return wled

    def stop(self):
        self.sender.deactivate_output(1)
        self.sender.stop()
        self.sender = None

    def update(self, color_list):
        data = []
        
        for color in color_list:
            data.append(math.floor(color.rgb[0] * 255))
            data.append(math.floor(color.rgb[1] * 255))
            data.append(math.floor(color.rgb[2] * 255))

        self.sender[1].dmx_data = tuple(data)
