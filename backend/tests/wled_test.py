import unittest
from colour import Color

from e131.exceptions import WledMaxPixelsExceeded
from e131.wled import Wled


class TestWled(unittest.TestCase):
    def setUp(self):
        self.wled = None

        return super().setUp()

    def test_missing_params(self):
        with self.assertRaises(
            TypeError,
            msg="Expected TypeError when connecting without specifying IP address and pixel count",
        ):
            Wled.connect()

    def test_invalid_pixel_count(self):
        with self.assertRaises(
            WledMaxPixelsExceeded,
            msg="Expected WledMaxPixelsExceeded for pixel count over 1500",
        ):
            Wled.connect("127.0.0.1", 1501),

    def test_correct_universes(self):
        self.wled = Wled.connect("127.0.0.1", 170)
        self.assertEqual(
            self.wled.universes, 1, msg="Expected 1 universes for 170 pixels"
        )
        self.assertEqual(
            self.wled.sender[2],
            None,
            msg="2 sender threads created when only one is required",
        )
        self.wled.stop()

        self.wled = Wled.connect("127.0.0.1", 171)
        self.assertEqual(
            self.wled.universes, 2, msg="Expected 2 universes for 171 pixels"
        )
        self.assertIsNotNone(
            self.wled.sender[2],
            msg="Only one sender thread created when 2 are required",
        )
        self.wled.stop()

        self.wled = Wled.connect("127.0.0.1", 1500)
        self.assertEqual(
            self.wled.universes, 9, msg="Expected 9 universes for 1500 pixels"
        )
        self.wled.stop()

    def test_update_single_universe(self):
        pixel_count = 170
        self.wled = Wled.connect("127.0.0.1", pixel_count)
        gradient = list(Color.range_to(Color("red"), Color("blue"), pixel_count))

        self.wled.update(gradient)
        dmx_data = self.wled.sender[1].dmx_data

        self.assertEqual(len(dmx_data), 512, msg="Unexpected DMX data buffer size")

    def test_update_multi_universe(self):
        pixel_count = 342
        self.wled = Wled.connect("127.0.0.1", pixel_count)
        gradient = list(Color.range_to(Color("red"), Color("blue"), pixel_count))

        self.wled.update(gradient)
        all_universes = []

        for sender in self.wled.sender.get_active_outputs():
            all_universes += self.wled.sender[sender].dmx_data

        self.assertEqual(
            len(all_universes), 512 * 3, msg="Unexpected DMX data buffer size"
        )

    def test_disconnect(self):
        pixel_count = 170
        self.wled = Wled.connect("127.0.0.1", pixel_count)
        gradient = list(Color.range_to(Color("red"), Color("blue"), pixel_count))

        self.wled.update(gradient)
        self.wled.update([])

        self.wled.stop()

        self.assertEqual(self.wled.sender, None, msg="Active senders after stop()")

    def tearDown(self):
        if self.wled:
            self.wled.stop()

        return super().tearDown()


if __name__ == "__main__":
    unittest.main()
