from os import path, getcwd
import websocket
import argparse
import atexit
import json


iracing_data = []
output_file = ""

def save_data():
    if not iracing_data:
        return

    print("Saving data to " + output_file)
    with open(output_file,"w") as file:
        json.dump(iracing_data, file, indent = 4)

def on_message(ws, message):
    iracing_data.append(json.loads(message))

def on_error(ws, error):
    print(error)

def on_close(ws, close_status_code, close_msg):
    print("### closed ###")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="iRacing data recorder")
    parser.add_argument("file", help="output file name")
    parser.add_argument(
        "--host", 
        default="localhost", 
        help="hostname of iracing server"
    )
    parser.add_argument(
        "--port", 
        default=8000, 
        help="port of iracing server"
    )
    args = parser.parse_args()

    current_path = path.abspath(getcwd())
    output_file = path.join(
        current_path, "data",
        f"{args.file}.json"
    )

    websocket.enableTrace(True)
    ws = websocket.WebSocketApp(f"ws://{args.host}:{args.port}/stream",
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    atexit.register(save_data)

    ws.run_forever()
