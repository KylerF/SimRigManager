import websocket
import json
import atexit

iracing_data = []

def save_data():
    with open("./data/test.json",'w') as file:
        json.dump(iracing_data, file, indent = 4)

def on_message(ws, message):
    iracing_data.append(json.loads(message))

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

if __name__ == "__main__":
    atexit.register(save_data)
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://192.168.1.201:8000/stream",
                              on_message=on_message,
                              on_error=on_error,
                              on_close=on_close)

    ws.run_forever()
