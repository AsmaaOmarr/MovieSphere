import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { APP_COLORS } from '../../constants';
import { Feature, Plan } from '../../interfaces/subscription-plan.interface';
import { SubscriptionCardComponent } from '../subscription-card/subscription-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subscription-details-screen',
  imports: [CommonModule, SubscriptionCardComponent],
  templateUrl: './subscription-details-screen.component.html',
})
export class SubscriptionDetailsScreenComponent {
  gray: string = APP_COLORS.gray;
  secondary: string = APP_COLORS.secondary;
  yellow: string = APP_COLORS.yellow;

  showAlert: boolean = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['alert'] === 'true') {
        this.showAlert = true;
        setTimeout(() => {
          this.showAlert = false;
        }, 6000);
      }
    });
  }

  @Input() title: string = '';
  @Input() price: string = '';
  @Input() features: Feature[] = [];
  @Input() isHighlighted: boolean = false;

  plans: Plan[] = [
    {
      title: 'Free Trial',
      price: '$0',
      features: [
        { text: 'Streaming in high quality', valid: true },
        { text: 'With the best audio quality', valid: true },
        { text: 'Stream on multiple devices', valid: false },
        { text: 'Ad-free viewing experience', valid: false },
        { text: 'Download to watch later', valid: false },
      ],
      highlighted: false,
    },
    {
      title: 'Monthly Subscription',
      price: '$9.99',
      features: [
        { text: 'Streaming in high quality', valid: true },
        { text: 'With the best audio quality', valid: true },
        { text: 'Stream on multiple devices', valid: true },
        { text: 'Ad-free viewing experience', valid: true },
        { text: 'Download to watch later', valid: true },
      ],
      highlighted: true,
    },
    {
      title: 'Yearly Subscription',
      price: '$49.99',
      features: [
        { text: 'Streaming in high quality', valid: true },
        { text: 'With the best audio quality', valid: true },
        { text: 'Stream on multiple devices', valid: true },
        { text: 'Ad-free viewing experience', valid: true },
        { text: 'Download to watch later', valid: true },
      ],
      highlighted: false,
    },
  ];
}
