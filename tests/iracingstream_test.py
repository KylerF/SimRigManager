import unittest
from raceparse.iracingstream import IracingStream

class TestIracingStream(unittest.TestCase):
    def test_empty_stream(self):
        iracing_stream = IracingStream.get_stream()
        iracing_stream.update()

        self.assertFalse(iracing_stream.is_active, 
        msg='Stream should not think it is active when there is no data')
        
        self.assertEqual(iracing_stream.latest(), {}, 
        msg='Stream should not have data when there is no data!')

        iracing_stream.stop()
        self.assertIsNone(iracing_stream.ir, 
        msg='IRSDK object should have been destroyed upon closing stream')

    def test_stationary_stream(self):
        iracing_stream = IracingStream.get_stream(test_file='tests/data/ir01_idle_watkins.bin')

        self.assertTrue(iracing_stream.is_active, 
        msg="Stream should be active on test file")

        iracing_stream.update()
        snapshot = iracing_stream.latest()

        self.assertEqual(snapshot['rpm'], snapshot['idle_rpm'], 
        msg="Car should be at idling")

        iracing_stream.stop()
    
    def test_stationary_rev_stream(self):
        iracing_stream = IracingStream.get_stream(test_file='tests/data/ir01_revlimiter_watkins.bin')

        self.assertTrue(iracing_stream.is_active, 
        msg="Stream should be active on test file")

        iracing_stream.update()
        snapshot = iracing_stream.latest()

        self.assertTrue(snapshot['redline']-100 <= snapshot['rpm'] <= snapshot['redline'], 
        msg="Car should be within 100 RPM of redline (bouncing off rev limiter)")

        iracing_stream.stop()

    def test_full_speed_stream(self):
        iracing_stream = IracingStream.get_stream(test_file='tests/data/ir01_fullspeed_watkins.bin')

        self.assertTrue(iracing_stream.is_active, 
        msg="Stream should be active on test file")

        iracing_stream.update()
        snapshot = iracing_stream.latest()

        self.assertEqual(snapshot['speed'], 198,  
        msg="Speed should be 198 MPH")

        iracing_stream.stop()

if __name__ == '__main__':
    unittest.main()
