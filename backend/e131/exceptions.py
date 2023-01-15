class WledMaxPixelsExceeded(Exception):
    """
    Exception raised when attempting to connect to a WLED controller with
    invalid number of pixels
    """
    max_pixels = 1500

    def __init__(self, pixels, *args: object):
        super().__init__(*args)
        self.pixels = pixels

    def __str__(self):
        return f'Only {self.max_pixels} pixels supported per WLED controller'
