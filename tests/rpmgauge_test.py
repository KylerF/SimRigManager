import unittest
from colour import Color
from display.rpmgauge import RpmGauge

class TestRpmGauge(unittest.TestCase):
    def setUp(self):
        self.rpm_strip = RpmGauge(50, Color('green'), Color('red'), 20000)

    def test_empty_rpm(self):
        self.assertRaises(TypeError, lambda: self.rpm_strip.set_rpm(None),
        msg='Should raise TypeError if rpm is None')

    def test_rpm_0(self):
        self.rpm_strip.set_rpm(0)

        self.assertEqual(self.rpm_strip.rpm, 0, 
        msg='Rpm should be 0')

        self.assertEqual(len(self.rpm_strip.to_color_list()), 0, 
        msg='Color list should be empty at 0 rpm')

    def test_rpm_10000(self):
        self.rpm_strip.set_rpm(10000)

        self.assertEqual(self.rpm_strip.rpm, 10000, 
        msg='Rpm should be 5000')
        
        self.assertEqual(
            len(self.rpm_strip.to_color_list()), 
            int((10000/20000) * 50), 
            msg='Color list has incorrect size at 5000 rpm'
        )

        self.assertEqual(self.rpm_strip.to_color_list()[0], Color('green'), 
        msg='Wrong start color')

        self.assertAlmostEqual(
            self.rpm_strip.to_color_list()[-1].rgb[0], 
            self.rpm_strip.to_color_list()[-1].rgb[1], 
            delta=0.2, 
            msg='At half revs, end color should be yellowish'
        )

    def test_rpm_20000(self):
        self.rpm_strip.set_rpm(20000)

        self.assertEqual(self.rpm_strip.rpm, 20000, 
        msg='Rpm should be 20000')

        self.assertEqual(
            len(self.rpm_strip.to_color_list()), 
            int((20000/20000) * 50), 
            msg='Color list has incorrect size at 20000 rpm'
        )

        self.assertEqual(self.rpm_strip.to_color_list()[0], Color('green'), 
        msg='Wrong start color')

        self.assertEqual(self.rpm_strip.to_color_list()[-1], Color('red'), 
        msg='Wrong end color')

if __name__ == '__main__':
    unittest.main()
