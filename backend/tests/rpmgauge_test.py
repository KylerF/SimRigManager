from colour import Color
import unittest

from display.colortheme import ColorTheme
from display.rpmgauge import RpmGauge


class TestRpmGauge(unittest.TestCase):
    def setUp(self):
        color_theme = ColorTheme(Color("green"), Color("red"))
        self.rpm_strip = RpmGauge(50, color_theme, 20000)

    def test_empty_rpm(self):
        self.assertRaises(
            TypeError,
            lambda: self.rpm_strip.set_rpm(None),
            msg="Should raise TypeError if rpm is None",
        )

    def test_rpm_0(self):
        self.rpm_strip.set_rpm(0)

        self.assertEqual(self.rpm_strip.rpm, 0, msg="RPM should be 0")

        self.assertEqual(
            len(self.rpm_strip.to_color_list()),
            0,
            msg="Color list should be empty at 0 RPM",
        )

    def test_rpm_negative(self):
        self.rpm_strip.set_rpm(-1000)

        self.assertEqual(
            self.rpm_strip.rpm, 0, msg="A negative RPM should not be allowed"
        )

    def test_idle_rpm_negative(self):
        self.rpm_strip.set_idle_rpm(-1000)

        self.assertEqual(
            self.rpm_strip.idle_rpm, 0, msg="A negative idle RPM should not be allowed"
        )

    def test_redline_negative(self):
        self.rpm_strip.set_redline(-1000)

        self.assertEqual(
            self.rpm_strip.redline,
            0,
            msg="A negative redline RPM should not be allowed",
        )

    def test_rpm_10000(self):
        self.rpm_strip.set_rpm(10000)

        self.assertEqual(self.rpm_strip.rpm, 10000, msg="RPM should be 10000")

        self.assertEqual(
            len(self.rpm_strip.to_color_list()),
            50,
            msg="Color list has incorrect size at 10000 RPM",
        )

        self.assertEqual(
            self.rpm_strip.to_color_list()[0],
            Color("green"),
            msg="Wrong start color on first strip",
        )

        self.assertEqual(
            self.rpm_strip.to_color_list()[-1],
            Color("green"),
            msg="Wrong start color on second strip",
        )

        self.assertAlmostEqual(
            self.rpm_strip.to_color_list()[12].rgb[0],
            self.rpm_strip.to_color_list()[12].rgb[1],
            delta=0.2,
            msg="At half revs, end color should be yellowish on first strip",
        )

        self.assertAlmostEqual(
            self.rpm_strip.to_color_list()[36].rgb[0],
            self.rpm_strip.to_color_list()[36].rgb[1],
            delta=0.2,
            msg="At half revs, end color should be yellowish on second strip",
        )

    def test_rpm_20000(self):
        self.rpm_strip.set_rpm(20000)

        self.assertEqual(self.rpm_strip.rpm, 20000, msg="Rpm should be 20000")

        self.assertEqual(
            len(self.rpm_strip.to_color_list()),
            50,
            msg="Color list has incorrect size at 20000 RPM",
        )

        self.assertEqual(
            self.rpm_strip.to_color_list()[0],
            Color("green"),
            msg="Wrong start color on the first strip",
        )

        self.assertEqual(
            self.rpm_strip.to_color_list()[-1],
            Color("green"),
            msg="Wrong start color on the second strip",
        )

        self.assertEqual(
            self.rpm_strip.to_color_list()[24],
            Color("red"),
            msg="Wrong end color on the first strip",
        )

        self.assertEqual(
            self.rpm_strip.to_color_list()[25],
            Color("red"),
            msg="Wrong start color on the second strip",
        )


if __name__ == "__main__":
    unittest.main()
