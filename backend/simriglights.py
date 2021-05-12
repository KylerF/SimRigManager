from database.database import generate_database, engine
from workerthreads.iracingworker import IracingWorker
from raceparse.iracingstream import IracingStream
from quotes.init_quotes import init_quotes
from display.colortheme import ColorTheme
from display.rpmgauge import RpmGauge
from api.apiserver import APIServer
from database import models
from e131.wled import Wled

from logging.handlers import RotatingFileHandler
from colour import Color
from queue import Queue
from time import sleep
from sys import exit
import configparser
import logging
import atexit
import sys

def main():
    # Create the database (if it does not already exist)
    generate_database()
    
    # Create all tables from models
    models.Base.metadata.create_all(bind=engine)

    # Populate the quotes table with samples
    init_quotes()

    # Get config options from file
    config = configparser.ConfigParser()
    config.read('config.ini')

    ip = config.get('wled', 'rpm_gauge_ip', fallback='127.0.0.1')
    universe = int(config.get('wled', 'rpm_gauge_universe', fallback=1))
    led_count = int(config.get('wled', 'rpm_gauge_led_count', fallback=120))
    primary_color = Color(config.get('colors', 'primary_color', fallback='green'))
    secondary_color = Color(config.get('colors', 'secondary_color', fallback='red'))
    framerate = int(config.get('data', 'framerate', fallback=50))
    log_level = config.get('logging', 'level', fallback='INFO')

    # Set up logging    
    file_handler = RotatingFileHandler('simriglights.log', maxBytes=20000000)
    stdout_handler = logging.StreamHandler(sys.stdout)

    logging.basicConfig(
        level=log_level, 
        format='%(asctime)s.%(msecs)03d %(levelname)s %(module)s - %(funcName)s: %(message)s',
        datefmt='%Y-%m-%d %H:%M:%S',
        handlers=[file_handler, stdout_handler]
    )

    log = logging.getLogger(__name__)

    # Check whether config was loaded
    try:
        _ = config['wled']['rpm_gauge_ip']
    except KeyError:
        log.error('Unable to load config file - reverting to default settings')

    # Set the color theme for all displays
    color_theme = ColorTheme(primary_color, secondary_color)

    # Set up WLED controller, iRacing data stream and displays
    log.info('Connecting to WLED')
    controller = Wled.connect(ip, universe)

    log.info('Connecting to iRacing')
    data_stream = IracingStream.get_stream()

    rpm_strip = RpmGauge(led_count, color_theme)

    # Set up a queue to pass data to and from the iRacing worker thread
    data_queue = Queue()

    # Kick off the iRacing worker thread
    iracing_worker = IracingWorker(data_queue, log, data_stream, controller, rpm_strip, framerate)
    iracing_worker.start()

    # Clean up resources upon exit
    atexit.register(iracing_worker.stop)
    atexit.register(data_stream.stop)
    atexit.register(controller.stop)

    # Start the API on the main thread
    api = APIServer(data_queue)
    api.start()

    # If we're here, exit everything
    iracing_worker.stop()

if __name__ == '__main__':
    main()
