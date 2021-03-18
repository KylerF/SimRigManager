from colour import Color
from e131.wled import Wled
from display.rpmgauge import RpmGauge
from raceparse.iracingstream import IracingStream

def main():
    data_stream = IracingStream.get_stream()

    #TODO: Set externally
    controller = Wled.connect('192.168.1.65', 1)

    # Grab redline RPM for current car
    rpm_strip = RpmGauge(50, Color('green'), Color('red'))

    while data_stream.is_active():
        latest = data_stream.latest()

        if rpm_strip.redline != latest['redline']:
            rpm_strip.set_redline(latest['redline'])

        rpm_strip.set_rpm(latest['rpm'])

        controller.update(rpm_strip.to_color_list())

    data_stream.stop()

if __name__ == '__main__':
    main()
