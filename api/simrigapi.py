from multiprocessing import Process
from flask import Flask

class SimRigAPI:
    api = Flask(__name__)
    server = None

    @staticmethod
    @api.route('/')
    def hello():
        return "Hello World!"

    def run(self):
        self.server = Process(target=self.run_server)
        self.server.start()
        self.server.join()

    def stop(self):
        if self.server:
            self.server.terminate()

    def run_server(self):
        self.api.run(debug=False)
