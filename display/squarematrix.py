from colour import Color

class SquareMatrix:
    def __init__(self, width, panes):
        self.width = width
        self.panes = panes

    def get_panes(self):
        return self.panes