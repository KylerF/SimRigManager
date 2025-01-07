import { Component } from '@angular/core';
import { NotificationService } from 'services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  standalone: false,
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}

  isTemplate(toast) {
    return toast.textOrTpl instanceof NotificationService;
  }
}
