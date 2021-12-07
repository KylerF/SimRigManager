# SimRig Mock API
## Description
A simple NodeJS app which streams mock iRacing data via websocket connections. It can be used for local development of SimRigManager or external apps that use the SimRig API.

## Usage
To start the mock API, run:
```
npm run start
```
Then, browse to http://localhost:8001.

The mock data is available through the same endpoints as the real SimRig API:
- [/latest](http://localhost:8001/latest): a REST endpoint which provides a snapshot of the latest data
- /stream: provides the websocket real-time stream running at 30 frames per second

## Data Files and Recording
All mock data is contained in JSON files in the data folder. A sample session is provided in default.json. The mock API will stream this data by default and loop through it continuously. 

To record new data, run:
```
python record.py [FILENAME] --host=[URL_TO_SIMRIG_API]
```
This will record all real-time session data being streamed by the SimRig API (so you will need an actual session running in iRacing), and save it to data/[FILENAME].json. You can manage data files through the mock API using these endpoints:
- [/files](http://localhost:8001/files): lists all available data files
- /files/[FILENAME]: will open the given file - if it exists - and begin streaming it
