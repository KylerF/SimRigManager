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
 *  ws://{baseURL}/iracing/stream - websocket connection to stream iRacing data
 *  http://{baseURL}/iracing/stream - stream iRacing data via Server Sent Events
 *  http://{baseURL}/iracing/latest - returns the latest iRacing data
 *  http://{baseURL}/files — returns a list of available files
 *  http://{baseURL}/files/{fileName} — selects the given file for streaming
 */

const StreamArray = require('stream-json/streamers/StreamArray');
const rateLimit = require('express-rate-limit').default;
const expressWebSocket = require('express-ws');
const express = require('express');
const cors = require("cors");
const path = require('path');
const fs = require('fs');

var wsConnections = [];
var eventSourceConnections = [];
var currentFrame = {};

var jsonStream = StreamArray.withParser();
const app = express();

// Set up rate limiter: maximum of five requests per second
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5,
  message: 'Whoa there partner, slow down! Only 5 requests per second.\
            Try a websocket connection if you need real-time data.',
});

// Apply rate limiter to all requests
app.use(limiter);

var stream = getFileStream('./src/data/default.json');

/**
 * Root endpoint for the mock API.
 * Returns all available endpoints with their descriptions in a fancy card using bootstrap.
 * Routes to index.html
 */
app.get('/', (_, res) => {
  res.sendFile(__dirname + '/index.html');
});

/**
 * Endpoint for the latest iRacing data.
 */
app.get("/iracing/latest", cors(), (_, res) => {
  res.send(currentFrame);
});

/**
 * Lists the available JSON data files and returns a list 
 * of files without the file extensions
 * 
 * @returns {array} list of files without file extensions
 * @example ['default', 'test']
 */
app.get("/files", (_, res) => {
  fs.readdir('./src/data', (err, files) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(
        files.filter(file => 
          file.endsWith('.json')
        )
        .map(file => file.split('.')[0])
      );
    }
  });
});

/**
 * Express endpoint to select a JSON file to stream.
 * If the file does not exist in the data directory,
 * a 404 is returned.
 * 
 * @param {string} file name of the file to stream
 */
app.get("/files/:file", (req, res) => {
  const file = req.params.file;
  const sanitizedFile = path.normalize(file).replace(/^(\.\.[\/\\])+/, '');

  const filePath = `./src/data/${sanitizedFile}.json`;

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendStatus(404);
    } else {
      stream.destroy();
      stream = getFileStream(filePath);
      res.sendStatus(200);
    }
  });
});

expressWebSocket(app, null, {
  perMessageDeflate: false,
});

/**
 * Websocket endpoint for the mock API.
 * Streams JSON data to all connected clients.
 */
app.ws('/iracing/stream', (ws) => {
  wsConnections.push(ws);

  ws.on('close', () => {
    wsConnections = wsConnections.filter(conn => conn !== ws);
  });
});

/**
 * HTTP endpoint to stream iRacing data via server sent events.
 */
app.get('/iracing/stream', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });
  res.flushHeaders();

  // Ping every 15 seconds
  setInterval(() => {
    res.write('event: ping\n');
    res.write(`data: ${new Date().toISOString()}\n\n`);
  }, 15000);

  eventSourceConnections.push(res);

  stream.on('end', () => {
    eventSourceConnections = eventSourceConnections.filter(
      conn => conn !== res
    );

    res.end();
  });
})

app.listen(8001);

/**
 * Open the mock data file and return a readstream
 * 
 * @param {string} file name of the file to open
 * @returns {stream} readstream of JSON file
 */
function getFileStream(file) {
  jsonStream = StreamArray.withParser();
  let newStream = fs.createReadStream(file)
    .pipe(jsonStream.input);

  jsonStream.on('data', ({_, value}) => {
    // Update all connected clients with the latest data
    wsConnections.forEach(ws => {
      ws.send(JSON.stringify(value));
    });

    eventSourceConnections.forEach(conn => {
      conn.write(`data: ${JSON.stringify(value)}\n\n`);
    });

    // Update the current frame
    currentFrame = value;

    // Slow down the stream to simulate real-time
    slowDownStream(newStream);
  });

  newStream.on('end', () => {
    stream = getFileStream(file);
  });

  return newStream;
}

/**
 * Slows down a JSON file stream to simulate a real-time stream
 * 
 * @param {*} stream readstream to be paused
 */
async function slowDownStream(stream) {
  stream.pause();
  await sleep(30);
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
