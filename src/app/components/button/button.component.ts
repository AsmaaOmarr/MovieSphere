import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { APP_COLORS } from '../../constants';

@Component({
  selector: 'app-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() name: string = 'Click Me';
  @Input() color: string = APP_COLORS.secondary;
  @Input() width: string = '10vw';
  @Output() action = new EventEmitter<void>();

  onClick() {
    this.action.emit();
  }
}
