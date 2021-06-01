from matrixtextmap import numbers16
from colour import Color

class SquareMatrix:
    '''
    A square LED matrix
    '''
    def __init__(self, width, color):
        self.width = width
        self.led_count = width*width
        self.color = color

    def set_text(self, text):
        self.text = str(text)

    def to_color_list(self):
        color_list = []

        for index in range(0, self.led_count):
            if index in numbers16[self.text]:
                color_list.append(self.color.rgb[0])
                color_list.append(self.color.rgb[1])
                color_list.append(self.color.rgb[2])
            else:
                color_list.extend([0]*3)

        return color_list
