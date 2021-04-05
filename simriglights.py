from raceparse.iracingstream import IracingStream
from display.rpmgauge import RpmGauge
from e131.wled import Wled

from logging.handlers import RotatingFileHandler
from colour import Color
from time import sleep
from sys import exit
import configparser
import logging
import atexit
import sys

def main():
    # Get config options from file
    config = configparser.ConfigParser()
    config.read('config.ini')

    ip = config.get('wled', 'rpm_gauge_ip', fallback='127.0.0.1')
    universe = int(config.get('wled', 'rpm_gauge_universe', fallback=1))
    led_count = int(config.get('wled', 'rpm_gauge_led_count', fallback=120))
    start_color = Color(config.get('colors', 'rpm_gauge_start_color', fallback='green'))
    end_color = Color(config.get('colors', 'rpm_gauge_end_color', fallback='red'))
    framerate = int(config.get('data', 'framerate', fallback=25))
    log_level = config.get('logging', 'level', fallback='INFO')

    # Set up logging    
    file_handler = RotatingFileHandler('simriglights.log', maxBytes=2000, backupCount=5)
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

    # Set up WLED controller and iRacing data stream
    log.info('Connecting to WLED')
    controller = Wled.connect(ip, universe)
    rpm_strip = RpmGauge(led_count, start_color, end_color)

    log.info('Connecting to iRacing')
    data_stream = IracingStream.get_stream()

    # Clean up resources upon exit
    atexit.register(data_stream.stop)
    atexit.register(controller.stop)

    try:
        while True:
            latest = data_stream.latest()

            if not data_stream.is_active or not latest['is_on_track']:
                if controller.is_connected:
                    controller.stop()
                    log.warning('iRacing data lost - waiting')

                data_stream.restart()
                sleep(1)
                continue
            else:
                if not controller.is_connected:
                    log.info('Reconnecting')
                    controller.reconnect()

            if rpm_strip.redline != latest['redline']:
                rpm_strip.set_redline(latest['redline'])
                log.debug('Setting redline to new value: ' + str(latest['redline']))
            if rpm_strip.idle_rpm != latest['idle_rpm']:
                rpm_strip.set_idle_rpm(latest['idle_rpm'])
                log.debug('Setting idle RPM to new value: ' + str(latest['idle_rpm']))
                
            rpm_strip.set_rpm(latest['rpm'])
            controller.update(rpm_strip.to_color_list())
            
            sleep(1/framerate)
    except KeyboardInterrupt:
        log.info('Keyboard interrupt received - exiting')
        exit()

if __name__ == '__main__':
    main()
