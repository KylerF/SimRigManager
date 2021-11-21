const StreamArray = require('stream-json/streamers/StreamArray');
const expressWebSocket = require('express-ws');
const express = require('express');
const fs = require('fs');

const jsonStream = StreamArray.withParser();
const app = express();

let currentFrame = {};

app.get("/latest", (req, res) => {
  res.send(currentFrame);
});

// extend express app with app.ws()
expressWebSocket(app, null, {
  // ws options here
  perMessageDeflate: false,
});

app.ws('/stream', (ws, req) => {
  const stream = fs.createReadStream('./src/data/daytona.json').pipe(jsonStream.input);

  jsonStream.on('data', ({key, value}) => {
    currentFrame = value;
    writeSessionData(ws, stream);
  });

  jsonStream.on('end', ({key, value}) => {
    console.log('End of file');
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
 * Function to write session data to console, then sleep for a 30 ms
 */
async function writeSessionData(ws, stream) {
  stream.pause();
  ws.send(JSON.stringify(currentFrame));
  await sleep(20);
  stream.resume();
}

/**
 * Function to sleep for a given time
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
