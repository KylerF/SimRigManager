import uvicorn

from api.simrigapi import SimRigAPI

class APIServer:
    def __init__(self):
        self.app = SimRigAPI()

    def start(self):
        self.start_server_process(self.app)

    def start_server_process(self, app):
        uvicorn.run(app.api)

    def stop(self):
        pass
