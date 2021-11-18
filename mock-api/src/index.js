const express = require('express');
const expressWebSocket = require('express-ws');
const websocketStream = require('websocket-stream/stream');
const fs = require('fs');

const app = express();

let sessionData = [{}];
let currentFrame = 0;

fs.readFile('./src/data/watkins.json', 'utf-8', (err, data) => {
  if (err) {
      throw err;
  }

  sessionData = JSON.parse(data.toString());
});

app.get("/latest", (req, res) => {
  res.send(sessionData.at(currentFrame));
});

// extend express app with app.ws()
expressWebSocket(app, null, {
    // ws options here
    perMessageDeflate: false,
});

app.ws('/stream', (ws, req) => {
  writeSessionData(ws);

  ws.on('message', msg => {
    console.log(msg);
  });
});

const server = app.listen(8002);

/**
 * Function to write session data to console, then sleep for a 30 ms
 */
async function writeSessionData(ws) {
  for (let i = 0; i < sessionData.length; i++) {
    ws.send(JSON.stringify(sessionData.at(i)));
    currentFrame = i;
    await sleep(30);
  }
}

/**
 * Function to sleep for a given time
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
