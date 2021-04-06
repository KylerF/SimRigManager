import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { Controller } from '../controller';


@Component({
  selector: 'controller-list',
  templateUrl: './controller-list.component.html',
  styleUrls: ['./controller-list.component.css']
})

/**
 * Component to list and configure WLED controllers
 */
export class ControllerListComponent implements OnInit {
  controllers: Controller[];

  constructor(private configService: ConfigService) { }

  ngOnInit(): void {
    this.getControllers();
  }

  /**
   * Update config and stop editing
   */
  finishEdit() {
    this.updateControllers();
  }

  /**
   * Retrieve configured WLED controllers
   */
  getControllers() {
    this.controllers = this.configService.getControllers();
  }

  /**
   * Update controller configuration
   */
  updateControllers() {
    this.configService.updateControllers(this.controllers);
  }
}
