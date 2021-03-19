from raceparse.iracingstream import IracingStream
from display.rpmgauge import RpmGauge
from e131.wled import Wled
from colour import Color
from time import sleep

def main():
    #TODO: Set IP externally
    controller = Wled.connect('192.168.1.65', 1)
    
    data_stream = IracingStream.get_stream()

    rpm_strip = RpmGauge(50, Color('green'), Color('red'))

    try:
        while True:
            sleep(1/60)
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
    except KeyboardInterrupt:
        data_stream.stop()
        controller.stop()

if __name__ == '__main__':
    main()
