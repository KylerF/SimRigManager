# SimRig Manager
Manage all of your iRacing accessories and data
1. Control custom LED fixtures (currently just an RPM gauge)
2. Set up driver profiles and compete for the fastest lap times
3. Develop your own iRacing apps using the SimRig API

## Installation
### Install the backend API
```
cd backend
python setup.py install
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
python setup.py nosetests
```
All unit tests are run using [nose](https://nose.readthedocs.io/en/latest/testing.html)

## Dependencies
### SimRig API
- [pyirsdk](https://github.com/kutu/pyirsdk)
- [sacn](https://github.com/Hundemeier/sacn)
- [Colour](https://github.com/vaab/colour)
- [FastAPI](https://github.com/tiangolo/fastapi)
- [Uvicorn](https://github.com/encode/uvicorn)
- [SQLAlchemy](https://github.com/sqlalchemy/sqlalchemy)
- [Pydantic](https://github.com/samuelcolvin/pydantic)
### Web App
- [Angular](https://github.com/angular/angular)
- [Bootstrap](https://getbootstrap.com/)
