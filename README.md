# SimRigLights
Code for the badass sim rig lights

## Installation
### As an executable
```
pip install pyinstaller
pyinstaller simriglights
```
An executable is generated in dist/simriglights

### To run with python
```
python setup.py install
```
Dependencies are installed manually on your system

## Usage
### Run the executable
#### Windows
Open simriglights.exe

#### Unix
```
cd dist/simriglights
./simriglights
```
### Start with python
```
python simriglights.py
```

## Testing
```
python setup.py test
```
All unit tests are run using [nose](https://nose.readthedocs.io/en/latest/testing.html)

## Dependencies
- [pyirsdk](https://github.com/kutu/pyirsdk)
- [sacn](https://github.com/Hundemeier/sacn)
- [Colour](https://github.com/vaab/colour)
