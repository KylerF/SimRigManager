import websocket
import json

def on_message(ws, message):
    with open("./data/jefferson.json",'r+') as file:
        file_data = json.load(file)
        file_data.append(json.loads(message))
        file.seek(0)
        json.dump(file_data, file, indent = 4)

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

if __name__ == "__main__":
    websocket.enableTrace(True)
    ws = websocket.WebSocketApp("ws://192.168.1.201:8000/stream",
                              on_message=on_message,
                              on_error=on_error,
                              on_close=on_close)

    ws.run_forever()
