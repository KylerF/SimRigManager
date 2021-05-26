import unittest

from backend.e131.wled import Wled

class TestWled(unittest.TestCase):
    def test_missing_params(self):
        self.assertRaises(TypeError, lambda: Wled.connect(), 
        msg='Expected TypeError when connecting without specifying IP address and universe')

if __name__ == '__main__':
    unittest.main()
