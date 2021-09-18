from colour import Color

class Display:
    """
    A generic LED display. Provides methods for mapping and conversion to 
    DMX commands for children, which give dimension and concrete conversion
    logic. 
    """
    def __init__(self, led_count, color_theme):
        self.led_count = led_count # 1D pixel count
        self.color_theme = color_theme # Contains a primary and secondary color
