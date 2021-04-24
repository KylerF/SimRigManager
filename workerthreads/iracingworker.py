from time import sleep
import threading

class IracingWorker(threading.Thread):
    def __init__(self, data_queue, logger, data_stream, controller, rpm_strip, framerate):
        threading.Thread.__init__(self)
        self.threadID = 1
        self.name = 'iRacing Worker Thread'
        self.active = True

        self.data_queue = data_queue
        self.log = logger
        self.data_stream = data_stream
        self.controller = controller
        self.rpm_strip = rpm_strip
        self.framerate = framerate

    def run(self):
        self.work()

    def stop(self):
        self.active = False

    def work(self):
        while self.active:
            try:
                latest = self.data_stream.latest()

                if not self.data_stream.is_active or not latest['is_on_track']:
                    if self.controller.is_connected:
                        self.controller.stop()
                        self.log.info('iRacing data lost - waiting')

                    self.data_stream.restart()
                    sleep(1)
                    continue
                else:
                    if not self.controller.is_connected:
                        self.log.info('Reconnecting')
                        self.controller.reconnect()

                if self.rpm_strip.redline != latest['redline']:
                    self.rpm_strip.set_redline(latest['redline'])
                    self.log.debug('Setting redline to new value: ' + str(latest['redline']))
                if self.rpm_strip.idle_rpm != latest['idle_rpm']:
                    self.rpm_strip.set_idle_rpm(latest['idle_rpm'])
                    self.log.debug('Setting idle RPM to new value: ' + str(latest['idle_rpm']))
                    
                self.rpm_strip.set_rpm(latest['rpm'])
                self.controller.update(self.rpm_strip.to_color_list())
                
                sleep(1/self.framerate)
            except KeyboardInterrupt:
                self.log.info('Keyboard interrupt received - exiting')
                self.stop()
            except KeyError:
                self.log.error('Required data not found - stopping iRacing stream')
                self.data_stream.stop()
            except Exception:
                self.log.exception('Unhandled exit condition')
                self.stop()
