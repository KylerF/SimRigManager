/**
 * Simulate a real-time stream of iRacing data.
 * The stream begins immediately so that all connnections will 
 * receive the same data at any given time.
 * 
 * To create a JSON file with test data, run record.py and point it
 * to your SimRigAPI instance with an iRacing session running. This will
 * record all session data to a JSON file in ./data.
 * 
 * Endpoints:
 *  ws://{baseURL}/stream: returns a JSON stream of iRacing data
 *  http://{baseURL}/latest: returns the latest iRacing data
 */

const StreamArray = require('stream-json/streamers/StreamArray');
const expressWebSocket = require('express-ws');
const express = require('express');
const fs = require('fs');

let currentFrame = {};

const jsonStream = StreamArray.withParser();
const app = express();

const stream = fs.createReadStream('./src/data/test.json').pipe(jsonStream.input);

jsonStream.on('data', ({key, value}) => {
  currentFrame = value;
  slowDownStream(stream);
});

jsonStream.on('end', () => {
  console.log('Stream ended');
});


app.get("/latest", (req, res) => {
  res.send(currentFrame);
});

// extend express app with app.ws()
expressWebSocket(app, null, {
  // ws options here
  perMessageDeflate: false,
});

app.ws('/stream', (ws, req) => {
  jsonStream.on('data', () => {
    ws.send(JSON.stringify(currentFrame));
  });

  ws.on('message', msg => {
    console.log(msg);
  });

  ws.on('close', () => {
    stream.pause();
  });
});

app.listen(8002);

/**
 * Slows down a JSON file stream to simulate a real-time stream
 * 
 * @param {*} stream readstream to be paused
 */
async function slowDownStream(stream) {
  stream.pause();
  await sleep(20);
  stream.resume();
}

/**
 * Blocking function to sleep for a given time
 * 
 * @param {int} ms time in milliseconds
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
