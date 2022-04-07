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
 *  http://{baseURL}/delay/{ms} — sets the delay between streaming data frames in milliseconds
 */

const StreamArray = require('stream-json/streamers/StreamArray');
const rateLimit = require('express-rate-limit').default;
const expressWebSocket = require('express-ws');
const express = require('express');
const process = require('process');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

var wsConnections = [];
var eventSourceConnections = [];
var currentFrame = {};
var stream;

var options = {
  selectedFile: "default",
  streamDelay: 30
};

// Load config options from file
fs.readFile('config.json', 'utf8', (error, data) => {
  if (error) {
    console.log('Using default config options');
  } else {
    try {
      let config = JSON.parse(data);
      verifyConfig(config);
      options = config;

      fs.stat(`./src/data/${options.selectedFile}.json`, (err, stat) => {
        if(err) {
          console.error(`Unable to load selected file: ${err}`);
          console.log('Using default file');
          options.selectedFile = 'default';
        }
        stream = getFileStream(`./src/data/${options.selectedFile}.json`);
      });
    } catch (error) {
      console.error(`There is an error in your configuration file: ${error}`);
      console.log('Using default config options');
    }
  }
});

var jsonStream = StreamArray.withParser();
const app = express();

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views')); 
app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));
app.use('/js', express.static('node_modules/jquery/dist'));

// Set up rate limiter: maximum of five requests per second
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 5,
  message: 'Whoa there partner, slow down! Only 5 requests per second.\
            Try a websocket connection if you need real-time data.',
});

// Apply rate limiter to all requests
app.use(limiter);

// Save config options on exit
process.on("SIGINT", saveConfigOptions);
process.on("SIGTERM", saveConfigOptions);
process.on("SIGHUP", saveConfigOptions);

/**
 * Root endpoint for the mock API.
 * Returns all available endpoints with their descriptions in a 
 * fancy card using bootstrap.
 */
app.get('/', (req, res) => {
  fs.readdir('./src/data', (err, files) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      let fileNames = files.filter(file => 
        file.endsWith('.json')
      )
      .map(file => file.split('.')[0]);

      res.render('index', {
        files: fileNames,
        selectedFile: options.selectedFile,
        delay: options.streamDelay
      });
    }
  });
});

/**
 * Endpoint for the latest iRacing data.
 */
app.get('/iracing/latest', cors(), (req, res) => {
  res.send(currentFrame);
});

/**
 * Lists the available JSON data files and returns a list 
 * of files without the file extensions
 * 
 * @returns {array} list of files without file extensions
 * @example ['default', 'test']
 */
app.get('/files', (req, res) => {
  fs.readdir('./src/data', (err, files) => {
    if (err) {
      console.error(err);
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
app.get('/files/:file', (req, res) => {
  const file = req.params.file;
  const sanitizedFile = path.normalize(file).replace(/^(\.\.[\/\\])+/, '');

  const filePath = `./src/data/${sanitizedFile}.json`;

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendStatus(404);
    } else {
      options.selectedFile = sanitizedFile;
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
});

/**
 * Endpoint used to set the delay between frames
 * 
 * @param {integer} delay milliseconds to wait between frames
 */
app.get('/delay/:delay', (req, res) => {
  const delay = req.params.delay;
  options.streamDelay = delay;

  res.sendStatus(200);
});

app.listen(8001, () => {
  console.log('Listening on port 8001');
});

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
 * @param {stream} stream readstream to be paused
 */
async function slowDownStream(stream) {
  stream.pause();
  await sleep(options.streamDelay);
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

/**
 * Check that loaded configuration options include the expected keys
 * 
 * @param {object} config object to verify
 */
function verifyConfig(config) {
  for (let key in options) {
    if (!config[key]) {
      throw Error(`"${key}" option missing`)
    }
  }
}

/**
 * Save configuration options to disk
 */
function saveConfigOptions() {
  try {
    fs.writeFileSync(
      './config.json',
      JSON.stringify(options)
    );
  } catch(error) {
    console.error(`Unable to save config options: ${error}`);
  } finally {
    process.exit(0);
  }
}
