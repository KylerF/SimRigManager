/**
 * Helper class to provide car-specific images
 */
export class CarImageHelper {
  private static baseImagePath = '/assets/images/wheels';

  private static wheelImageMap = {
    'Corvette C7 Daytona Prototype': 'corvette_wheel.png',
    'Mazda MX-5 Cup': 'mx5_wheel.png',
    'Porsche 911 GT3 Cup (991)': 'porsche_wheel.png',
    'Cadillac CTS-V Racecar': 'ctsv_wheel.png',
    'Dallara DW12': 'f1_wheel.png',
    'Dallara IR01': 'f1_wheel.png',
    'Mclaren MP4-30': 'f1_wheel.png',
    'Mclaren MP4-12C GT3': 'mclaren_wheel.png',
    'Volkswagen Beetle GRC': 'vw_wheel.png',
    'Volkswagen Beetle GRC Lite': 'vw_wheel.png',
    'Ferrari 488 GT3': 'ferrari_wheel.png',
    'Kia Optima': 'optima_wheel.png',
    'Subaru WRX STI': 'sti_wheel.png',
    'Ford Fiesta RS WRC': 'fiesta_wheel.png',
    'Mercedes W12': 'f1_wheel.png',
  }

  /**
   * Get the path to a wheel image for the given car
   *
   * @param carName car for which to search for a wheel image
   * @returns wheel image for the car, or the default
   */
  static getImageForCar(carName) {
    if (carName in this.wheelImageMap) {
      return `${this.baseImagePath}/${this.wheelImageMap[carName]}`;
    } else {
      return `${this.baseImagePath}/default_wheel.png`;
    }
  }
}
