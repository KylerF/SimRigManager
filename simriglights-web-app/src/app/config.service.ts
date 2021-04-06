import { Injectable } from '@angular/core';
import { Controller } from './controller';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to retrieve and update config options
 */
export class ConfigService {
  constructor() { }

  getControllers(): Controller[] {    
    return [
      new Controller('RPM Gauge', '192.168.1.104', 1), 
      new Controller('Matrix', '192.168.1.105', 1)
    ];
  }

  updateControllers(controllers: Controller[]) {

  }
}
