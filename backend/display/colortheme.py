from colour import Color

class ColorTheme:
    '''
    A theme applied to an LED display
    '''
    def __init__(self, primary_color, secondary_color):
        self.primary_color = primary_color
        self.secondary_color = secondary_color
