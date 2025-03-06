import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { APP_COLORS } from '../../constants';
import { ButtonHoverDirective } from '../../directives/button-hover.directive';

@Component({
  selector: 'app-button',
  imports: [CommonModule,ButtonHoverDirective],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() name: string = 'Click Me';
  @Input() color: string = APP_COLORS.secondary;
  @Input() width: string = '10vw';
  @Input() borderRadius: string = '';
  @Output() action = new EventEmitter<void>();

  onClick() {
    this.action.emit();
  }
}
