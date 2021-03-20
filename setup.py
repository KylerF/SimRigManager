#!python3

from setuptools import setup
#TODO: Manage elsewhere
VERSION = '1.0.0'

setup(
    name='simriglights',
    version=VERSION,
    description='Service to control lights over e1.31 in response to iRacing events',
    author='Kyler Freas',
    url='https://github.com/KylerF/SimRigLights',
    py_modules=['simriglights'],
    classifiers=[
        'Environment :: Console',
        'Programming Language :: Python :: 3.7',
        'Topic :: Utilities',
    ],
    test_suite='nose.collector',
    tests_require=['nose'],
    entry_points={
        'console_scripts': ['simriglights = simriglights:main'],
    },
    install_requires=[
        'pyirsdk', 
	'colour', 
        'sacn',
    ],
)
