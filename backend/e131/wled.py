import sacn
import math

class Wled:
    """
    WLED controller object to handle ACN communications and update
    the color of the connected LEDs
    """
    is_connected = False
    
    """
    Used to connect to the WLED controller
    """
    @staticmethod
    def connect(ip, universe):
        """
        Create and return a controller ready for use
        """
        wled = Wled()
        wled.ip = ip
        wled.universe = universe
        wled.reconnect()

        return wled

    def stop(self):
        """
        Close the communication and destroy the sender (recreated on next connection)
        """
        if self.sender:
            self.sender.deactivate_output(1)
            self.sender.stop()
            self.sender = None
            
            self.is_connected = False

    def reconnect(self):
        """
        Recreate and set up the sender
        """
        self.sender = sacn.sACNsender()
        self.sender.start()
        self.sender.activate_output(self.universe)
        self.sender[self.universe].destination = self.ip
        
        self.is_connected = True

    def update(self, color_list):
        """
        Send some colors down stream
        """
        data = []
        
        for color in color_list:
            data.append(math.floor(color.rgb[0] * 255))
            data.append(math.floor(color.rgb[1] * 255))
            data.append(math.floor(color.rgb[2] * 255))

        self.sender[1].dmx_data = tuple(data)
