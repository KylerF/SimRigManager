"""
Unit tests for the IracingStream module
Test data is stored in .bin files located in the /data directory
Additional files can be generating using the irsdk script
(https://github.com/kutu/pyirsdk/blob/master/tutorials/02%20Using%20irsdk%20script.md)
TODO: Close the files that irsdk is leaving open even after stopping the stream
"""
import unittest
from raceparse.iracingstream import IracingStream

class TestIracingStream(unittest.TestCase):
    def test_empty_stream(self):
        """
        Test creating a stream without a running iRacing instance and no test file
        """
        iracing_stream = IracingStream.get_stream()
        iracing_stream.update()

        self.assertFalse(iracing_stream.is_active, 
        msg="Stream should not think it is active when there is no data")
        
        self.assertEqual(iracing_stream.latest(), {}, 
        msg="Stream should not have data when there is no data!")

        iracing_stream.stop()
        self.assertIsNone(iracing_stream.ir, 
        msg="IRSDK object should have been destroyed upon closing stream")

    def test_stationary_stream(self):
        """
        Test getting data while the car is idling
        """
        iracing_stream = IracingStream.get_stream(test_file="tests/data/ir01_idle_watkins.bin")

        self.assertTrue(iracing_stream.is_active, 
        msg="Stream should be active on test file")

        iracing_stream.update()
        snapshot = iracing_stream.latest()

        self.assertEqual(snapshot["rpm"], snapshot["idle_rpm"], 
        msg="Car should be at idling")

        iracing_stream.stop()
        self.assertIsNone(iracing_stream.ir, 
        msg="IRSDK object should have been destroyed upon closing stream")
    
    def test_stationary_rev_stream(self):
        """
        Test getting data while the car is bouncing off the rev limiter
        """
        iracing_stream = IracingStream.get_stream(test_file="tests/data/ir01_revlimiter_watkins.bin")

        self.assertTrue(iracing_stream.is_active, 
        msg="Stream should be active on test file")

        iracing_stream.update()
        snapshot = iracing_stream.latest()

        self.assertTrue(snapshot["redline"]-100 <= snapshot["rpm"] <= snapshot["redline"], 
        msg="Car should be within 100 RPM of redline (bouncing off rev limiter)")

        iracing_stream.stop()
        self.assertIsNone(iracing_stream.ir, 
        msg="IRSDK object should have been destroyed upon closing stream")

    def test_full_speed_stream(self):
        """
        Test getting data while the car is at speed
        """
        iracing_stream = IracingStream.get_stream(test_file="tests/data/ir01_fullspeed_watkins.bin")

        self.assertTrue(iracing_stream.is_active, 
        msg="Stream should be active on test file")

        iracing_stream.update()
        snapshot = iracing_stream.latest()

        self.assertEqual(snapshot["speed"], 198,  
        msg="Speed should be 198 MPH")

        iracing_stream.stop()
        self.assertIsNone(iracing_stream.ir, 
        msg="IRSDK object should have been destroyed upon closing stream")

if __name__ == "__main__":
    unittest.main()
