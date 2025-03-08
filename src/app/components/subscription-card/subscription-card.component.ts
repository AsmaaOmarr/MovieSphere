import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { APP_COLORS } from '../../constants';
import { Feature } from '../../interfaces/subscription-plan.interface';


@Component({
  selector: 'app-subscription-card',
  imports: [CommonModule],
  templateUrl: './subscription-card.component.html',
  styleUrl: './subscription-card.component.css'
})
export class SubscriptionCardComponent {
  gray: string = APP_COLORS.gray;
  secondary: string = APP_COLORS.secondary;
  @Input() title: string = '';
  @Input() price: string = '';
  @Input() features: Feature[] = [];
  @Input() isHighlighted: boolean = false;
}
