from queue import Queue


class QueueManager:
    """
    Handles communication channels between the API and worker threads
    using the built-in Queue
    """
    def __init__(self):
        self.channels = {}
        self.subscribers = {}

    def open_channel(self, name):
        """
        Create a new queue
        """
        self.channels[name] = Queue()

    def put(self, channel, message):
        """
        Send a message on the given queue
        """
        try:
            queue = self.channels[channel]
        except (KeyError):
            return False

        queue.put(message)

        # Update subscribers
        if channel in self.subscribers:
            for subscriber_callback in self.subscribers[channel]:
                subscriber_callback(message)

        return True

    def get(self, channel):
        """
        Get a message from the given queue
        """
        try:
            queue = self.channels[channel]
        except (KeyError):
            return None

        if queue.empty():
            return None

        return queue.get()

    def subscribe(self, channel, callback):
        """
        Subscribe a callback function to a channel
        """
        try:
            _ = self.channels[channel]
        except (KeyError):
            return False

        if channel not in self.subscribers:
            self.subscribers[channel] = []

        self.subscribers[channel].append(callback)

        return True

    def close_channel(self, channel):
        """
        Remove a queue
        """
        try:
            queue = self.channels[channel]
        except (KeyError):
            return False

        queue.queue.clear()
        self.channels.pop(channel)

        return True

    def close_all(self):
        """
        Remove all queues (used for cleanup during shutdown)
        """
        for channel in self.channels:
            self.channels[channel].queue.clear()

        self.subscribers.clear()
        self.channels.clear()
