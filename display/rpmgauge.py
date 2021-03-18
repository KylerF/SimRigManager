from colour import Color

class RpmGauge:
    def __init__(self, led_count, start_color, end_color, rpm=0, redline=0):
        self.led_count = led_count
        self.start_color = start_color
        self.end_color = end_color
        self.redline = redline
        self.rpm = rpm

    def set_rpm(self, rpm):
        if rpm is None:
            raise TypeError

        self.rpm = rpm

    def set_redline(self, redline):
        if redline is None:
            raise TypeError

        self.redline = redline

    def to_color_list(self):
        if self.rpm == 0:
            return []
        
        length = self.translate(self.rpm, 0, self.redline, 0, self.led_count)

        return list(self.start_color.range_to(self.end_color, length))

    def translate(self, value, leftMin, leftMax, rightMin, rightMax):
        # Figure out how 'wide' each range is
        leftSpan = leftMax - leftMin
        rightSpan = rightMax - rightMin

        # Convert the left range into a 0-1 range (float)
        valueScaled = float(value - leftMin) / float(leftSpan)

        # Convert the 0-1 range into a value in the right range.
        return int(rightMin + (valueScaled * rightSpan))
