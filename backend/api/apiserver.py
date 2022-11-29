from os import getenv
import uvicorn

from api.simrigapi import SimRigAPI

class APIServer:
    """
    Uvicorn server to run the API
    """
    def __init__(self):
        self.app = SimRigAPI()
        self.port = getenv("PORT", 8000)

    def start(self):
        self.start_server_process(self.app)

    def start_server_process(self, app):
        uvicorn.run(app.api, host="0.0.0.0", port=self.port)
