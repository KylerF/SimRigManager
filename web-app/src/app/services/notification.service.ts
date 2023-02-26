import { Injectable, TemplateRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notifications: any[] = [];

  show(textOrTemplate: string | TemplateRef<any>, options: any = {}) {
    this.notifications.push({
      textOrTemplate,
      ...options,
    });
  }

  remove(notification) {
    this.notifications = this.notifications.filter((t) => t !== notification);
  }
}
