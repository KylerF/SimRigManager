from iracingstream import IracingStream

class RaceParse:
    @staticmethod
    def get_parser(self, test_file=None):
        parser = RaceParse()
        parser.start_stream(test_file)

        return parser

    def start_stream(self):
        self.stream = IracingStream.get_stream(test_file)

    def get_led_state(self):
        stream_snapshot = self.stream.get_snapshot()
