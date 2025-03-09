import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-paypal-button',
  imports: [],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})

export class PaypalButtonComponent implements OnInit {
  @ViewChild('paypalContainer', { static: true }) paypalContainer!: ElementRef;
  
  @Input() amount: string = '0.00';
  @Input() currency: string = 'USD';

  ngOnInit(): void {
    if (parseFloat(this.amount) <= 0) {
      console.error('Invalid amount: Amount must be greater than 0.');
      return;
    }

    if ((<any>window).paypal) {
      (<any>window).paypal.Buttons({
        style: {
          layout: 'vertical',
          color: 'silver', 
          shape: 'pill',
          label: 'subscribe'
        },
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: this.amount,
                currency_code: this.currency
              }
            }],
            application_context: {
              shipping_preference: 'NO_SHIPPING'
            }
          });
        },
        
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            console.log('Transaction completed by ' + details.payer.name.given_name);
            // navigate to success page
          });
        },
        onError: (err: any) => {
          console.error('PayPal error', err);
        }
      }).render(this.paypalContainer.nativeElement);
    } else {
      console.error('PayPal SDK not loaded.');
    }
  }
}