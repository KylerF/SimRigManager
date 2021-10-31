# SimRig Manager
Manage all of your iRacing accessories and data
1. Control custom LED fixtures (currently just an RPM gauge)
2. Set up driver profiles and compete for the fastest lap times
3. Develop your own iRacing apps using the SimRig API

## Installation
### Install the backend API
```
cd backend
pip install -r requirements.txt
```
This is a background service that will connect to iRacing, so install it on the system you use to play iRacing.

### Run the web application
#### For development
```
cd web-app
npm install
ng serve
```

#### For production
```
cd web-app
ng build --prod
```
The compiled application is generated in the ```dist``` folder. How you host it is up to you.
## Usage
### Start the API
```
python simriglights.py
```
To keep this running all the time, you can configure a [NSSM service](https://nssm.cc/download), or use [PM2](https://www.npmjs.com/package/pm2) if you already have NodeJS installed.
### Web App
Browse to http://localhost:4200, add some drivers and light controllers, then start racing!
## API Documentation
Check out http://localhost:8000/docs for Swagger UI documentation, or the ReDoc documentation at http://localhost:8000/docs

## Testing
```
pip install pytest
pytest
```
All backend unit tests are run using [pytest](https://docs.pytest.org/en/6.2.x/)
```
npm test
```
All Angular unit tests are run using [karma](http://karma-runner.github.io/6.3/index.html) in a headless Chrom browser

## Docker
The project is also configured to be run with [Docker Compose](https://docs.docker.com/compose/):
```
docker-compose up
```
This will bring up the entire application. To bring up a single service (i.e. the backend API):
```
docker-compose up backend
```
And to force a rebuild:
```
docker-compose up --build
```
