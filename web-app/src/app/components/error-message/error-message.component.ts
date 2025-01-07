import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss'],
  standalone: true,
})
export class ErrorMessageComponent {
  @Input() title: string;
  @Input() message: string;

  constructor() {}
}

