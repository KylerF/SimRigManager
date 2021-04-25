import uvicorn

from api.simrigapi import SimRigAPI

class APIServer:
    def __init__(self, data_queue):
        self.app = SimRigAPI(data_queue)

    def start(self):
        self.start_server_process(self.app)

    def start_server_process(self, app):
        uvicorn.run(app.api)
