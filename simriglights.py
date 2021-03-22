from raceparse.iracingstream import IracingStream
from display.rpmgauge import RpmGauge
from e131.wled import Wled
from colour import Color
from time import sleep
from sys import exit
import configparser
import atexit

def main():
    # Get config options from file
    config = configparser.ConfigParser()
    config.read('config.ini')

    ip = config['wled']['rpm_gauge_ip'] or '127.0.0.1'
    universe = int(config['wled']['rpm_gauge_universe']) or 1
    led_count = int(config['wled']['rpm_gauge_led_count']) or 120
    start_color = Color(config['colors']['rpm_gauge_start_color']) or Color('green')
    end_color = Color(config['colors']['rpm_gauge_end_color']) or Color('red')
    framerate = int(config['data']['framerate']) or 25

    # Set up WLED controller and iRacing data stream
    controller = Wled.connect(ip, universe)
    rpm_strip = RpmGauge(led_count, start_color, end_color)

    data_stream = IracingStream.get_stream()

    # Clean up resources upon exit
    atexit.register(data_stream.stop)
    atexit.register(controller.stop)

    try:
        while True:
            latest = data_stream.latest()

            if not data_stream.is_active or not latest['is_on_track']:
                controller.stop()
                sleep(1)
                continue
            else:
                controller.reconnect()

            if rpm_strip.redline != latest['redline']:
                rpm_strip.set_redline(latest['redline'])
            if rpm_strip.idle_rpm != latest['idle_rpm']:
                rpm_strip.set_idle_rpm(latest['idle_rpm'])
                
            rpm_strip.set_rpm(latest['rpm'])
            controller.update(rpm_strip.to_color_list())
            
            sleep(1/framerate)
    except KeyboardInterrupt:
       exit()

if __name__ == '__main__':
    main()
