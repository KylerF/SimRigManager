import sacn
import math

from e131.sender_info import source
from e131.exceptions import WledMaxPixelsExceeded


class Wled:
    """
    WLED controller object to handle ACN communications and update
    the color of the connected LEDs
    """

    is_connected = False
    universes = 0

    @staticmethod
    def connect(ip, pixel_count):
        """
        Create and return a controller ready for use
        """
        if pixel_count > WledMaxPixelsExceeded.max_pixels:
            raise WledMaxPixelsExceeded(pixel_count)

        wled = Wled()
        wled.ip = ip
        wled.pixel_count = pixel_count
        wled.universes = math.ceil(pixel_count / 170)
        wled.reconnect()

        return wled

    def stop(self):
        """
        Close the communication and destroy the sender (recreated on next
        connection)
        """
        if self.sender:
            for output in self.sender.get_active_outputs():
                self.sender.deactivate_output(output)

            self.sender.stop()
            self.sender = None

            self.is_connected = False

    def reconnect(self):
        """
        Recreate and set up the sender
        """
        self.sender = sacn.sACNsender(
            bind_port=source["bind_port"],
            source_name=source["name"],
            cid=source["cid"],
            fps=source["fps"],
        )
        self.sender.start()

        # Configure universes needed for all pixels (one per 170 pixels)
        for universe in range(1, self.universes + 1):
            self.sender.activate_output(universe)
            self.sender[universe].destination = self.ip

        self.is_connected = True

    def update(self, color_list):
        """
        Send some colors down stream
        """
        self.sender.manual_flush = True

        # Split data into universe chunks
        chunks = [color_list[i * 170 : (i * 170) + 170] for i in range(self.universes)]

        universe = 1
        for colors in chunks:
            data = []
            for color in colors:
                data.append(math.floor(color.rgb[0] * 255))
                data.append(math.floor(color.rgb[1] * 255))
                data.append(math.floor(color.rgb[2] * 255))

            self.sender[universe].dmx_data = tuple(data)
            universe += 1

        # After all universe data is updated, send to device
        self.sender.flush()
        self.sender.manual_flush = False
