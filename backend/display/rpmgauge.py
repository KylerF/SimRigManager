from colour import Color


class RpmGauge:
    """
    An LED strip rpm gauge that maps the car's RPM to a color gradient
    """

    def __init__(self, led_count, color_theme, rpm=0, idle_rpm=0, redline=20000):
        self.led_count = led_count
        self.start_color = color_theme.primary_color
        self.end_color = color_theme.secondary_color
        self.rpm = rpm
        self.idle_rpm = idle_rpm
        self.redline = redline

        self.full_gradient = list(
            self.start_color.range_to(self.end_color, self.led_count)
        )

    def set_rpm(self, rpm):
        """
        Set the current RPM to be mapped to the display
        """
        if rpm is None:
            raise TypeError

        self.rpm = rpm if rpm > 0 else 0

    def set_idle_rpm(self, idle_rpm):
        """
        Set the idle RPM (lower limit used in mapping)
        """
        if idle_rpm is None:
            raise TypeError

        self.idle_rpm = idle_rpm if idle_rpm > 0 else 0

    def set_redline(self, redline):
        """
        Set the redline RPM (upper limit used in mapping)
        """
        if redline is None:
            raise TypeError

        self.redline = redline if redline > 0 else 0

    def to_color_list(self):
        """
        Translate the current state to a flat list - needed for DMX communication
        """
        if self.rpm == 0:
            return []

        length = self.translate(self.rpm, 0, self.redline, 0, self.led_count)
        colors = self.full_gradient[0:length]

        return colors + [Color("black")] * (self.led_count - len(colors))

    def translate(self, value, left_min, left_max, right_min, right_max):
        """
        Map an RPM value to a count within the range of the LED strip
        """
        # Figure out how "wide" each range is
        left_span = left_max - left_min
        right_span = right_max - right_min

        # Convert the left range into a 0-1 range (float)
        value_scaled = float(value - left_min) / float(left_span)

        # Convert the 0-1 range into a value in the right range.
        return int(right_min + (value_scaled * right_span))
