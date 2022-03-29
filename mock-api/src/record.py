"""
Simple websocket client to record iRacing data via the SimRig API.
Recorded data is saved to a JSON file, and can be loaded later to
replay the session.
"""
from os import path, getcwd
import websocket
import argparse
import atexit
import json


iracing_data = []
output_file = ""

def save_data():
    """
    Save the recorded iRacing data to a JSON file
    """
    if not iracing_data:
        return

    print(f"Saving data to {output_file}")
    with open(output_file,"w") as file:
        json.dump(iracing_data, file, indent = 4)

def on_message(ws, message):
    """
    Append the message to the iracing_data list, and give a 
    status update every 30 seconds
    """
    frame_count = len(iracing_data)
    if frame_count > 0 and frame_count % 900 == 0:
        print(f"Recorded {frame_count} frames ({frame_count*0.049} MB)")

    iracing_data.append(json.loads(message))

def on_open(ws):
    print("Press CTRL+C to stop recording")

def on_close(ws, close_status_code, close_msg):
    print(
        "### closed: status={0}, msg={1} ###"
        .format(close_status_code, close_msg)
    )

def on_error(ws, error):
    print(error)


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
                                on_open = on_open,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)

    atexit.register(save_data)

    ws.run_forever()
