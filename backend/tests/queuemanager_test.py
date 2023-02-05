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
        self.assertEqual(
            self.queue_manager.channels,
            {},
            "Expected empty channel list after init"
        )
        self.assertEqual(
            self.queue_manager.subscribers,
            {},
            "Expected empty subscriber list after init"
        )

    def test_open_channel(self):
        """
        Test adding a new channel
        """
        self.queue_manager.open_channel("test")

        self.assertIsInstance(
            self.queue_manager.channels["test"],
            Queue,
            "Expected a new queue to be created"
        )

    def test_put_get(self):
        """
        Test putting and getting data from a queue
        """
        self.queue_manager.open_channel("test")

        self.assertTrue(
            self.queue_manager.put("test", "test"),
            "Failed to put message on the queue"
        )
        self.assertEqual(
            self.queue_manager.get("test"),
            "test",
            "Failed to retrieve message from the queue"
        )

    def test_put_invalid_channel(self):
        """
        Test attempting to put data in a non-existent queue
        """
        self.assertFalse(
            self.queue_manager.put("test", "test"),
            "Should get false return value when pushing to an invalid channel"
        )

    def test_get_invalid_channel(self):
        """
        Test attempting to put data in a non-existent queue
        """
        self.assertIsNone(
            self.queue_manager.get("test"),
            "Invalid channel query should return None"
        )

    def test_get_empty(self):
        """
        Test getting data from an empty queue
        """
        self.queue_manager.open_channel("test")

        self.assertIsNone(
            self.queue_manager.get("test"),
            "Getting from an empty channel should return None"
        )

    def test_subscribe(self):
        """
        Test subscribing to a channel with a callback function
        """
        self.queue_manager.open_channel("test")
        self.queue_manager.subscribe("test", self.__subscribe_callback)

        self.assertEqual(
            len(self.queue_manager.subscribers["test"]),
            1,
            "Subscriber was not added"
        )

        self.queue_manager.put("test", "test")

        self.assertEqual(
            self.data_sink,
            "test",
            "Subscriber callback function was not called successfully"
        )

    def test_close_channel(self):
        """
        Test closing a channel
        """
        self.queue_manager.open_channel("test")
        self.queue_manager.put("test", "test")
        self.queue_manager.close_channel("test")

        self.assertEqual(
            self.queue_manager.channels,
            {},
            "Should have removed the channel"
        )

    def test_close_invalid_channel(self):
        """
        Test attempting to put data in a non-existent queue
        """
        self.assertFalse(
            self.queue_manager.close_channel("test"),
            "Expected false return value when closing an invalid channel"
        )

    def test_close_all_channels(self):
        """
        Test closing a channel
        """
        self.queue_manager.open_channel("test1")
        self.queue_manager.open_channel("test2")
        self.queue_manager.put("test1", "test")
        self.queue_manager.close_all()

        self.assertEqual(
            self.queue_manager.channels,
            {},
            "Expected empty channel list after closing all channels"
        )

    def __subscribe_callback(self, data):
        """
        Callback function for testing subscriptions
        """
        self.data_sink = data


if __name__ == "__main__":
    unittest.main()
