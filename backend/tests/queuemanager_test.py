from queue import Queue
import unittest

from messagequeue.queuemanager import QueueManager

class TestQueueManager(unittest.TestCase):
    """
    Unit tests for the QueueManager, used for communication between
    execution threads.
    """
    def setUp(self) -> None:
        self.queue_manager = QueueManager()
        self.data_sink = None

    def tearDown(self) -> None:
        self.queue_manager = None
        self.data_sink = None

    def test_init(self):
        """
        Test the initial state of the queue manager
        """
        self.assertEqual(self.queue_manager.channels, {})
        self.assertEqual(self.queue_manager.subscribers, {})

    def test_open_channel(self):
        """
        Test adding a new channel
        """
        self.queue_manager.open_channel("test")

        self.assertIsInstance(self.queue_manager.channels["test"], Queue)

    def test_put_get(self):
        """
        Test putting and getting data from a queue
        """
        self.queue_manager.open_channel("test")

        self.assertTrue(self.queue_manager.put("test", "test"))
        self.assertEqual(self.queue_manager.get("test"), "test")

    def test_put_invalid_channel(self):
        """
        Test attempting to put data in a non-existent queue
        """
        self.assertFalse(self.queue_manager.put("test", "test"))

    def test_get_invalid_channel(self):
        """
        Test attempting to put data in a non-existent queue
        """
        self.assertIsNone(self.queue_manager.get("test"))

    def test_get_empty(self):
        """
        Test getting data from an empty queue
        """
        self.queue_manager.open_channel("test")

        self.assertIsNone(self.queue_manager.get("test"))

    def test_subscribe(self):
        """
        Test subscribing to a channel with a callback function
        """
        self.queue_manager.open_channel("test")
        self.queue_manager.subscribe("test", self.__subscribe_callback)

        self.assertEqual(len(self.queue_manager.subscribers["test"]), 1)

        self.queue_manager.put("test", "test")

        self.assertEqual(self.data_sink, "test")

    def test_close_channel(self):
        """
        Test closing a channel
        """
        self.queue_manager.open_channel("test")
        self.queue_manager.put("test", "test")
        self.queue_manager.close_channel("test")

        self.assertEqual(self.queue_manager.channels, {})

    def test_close_invalid_channel(self):
        """
        Test attempting to put data in a non-existent queue
        """
        self.assertFalse(self.queue_manager.close_channel("test"))

    def test_close_all_channels(self):
        """
        Test closing a channel
        """
        self.queue_manager.open_channel("test1")
        self.queue_manager.open_channel("test2")
        self.queue_manager.put("test1", "test")
        self.queue_manager.close_all()

        self.assertEqual(self.queue_manager.channels, {})


    def __subscribe_callback(self, data):
        """
        Callback function for testing subscriptions
        """
        self.data_sink = data
