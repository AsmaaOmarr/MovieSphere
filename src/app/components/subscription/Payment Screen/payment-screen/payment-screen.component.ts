import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { APP_COLORS } from '../../../../constants';
import { CustomTextFieldComponent } from '../custom-text-field/custom-text-field.component';
import { PaypalButtonComponent } from "../paypal-button/paypal-button.component";

@Component({
  selector: 'app-payment-screen',
  templateUrl: './payment-screen.component.html',
  styleUrls: ['./payment-screen.component.css'],
  standalone: true,
  imports: [CustomTextFieldComponent, ReactiveFormsModule, CommonModule, PaypalButtonComponent],
})
export class PaymentScreenComponent implements OnInit {
  paymentForm: FormGroup;
  subscriptionPlan: any; 
  paymentData: any;
  secondary: string = APP_COLORS.secondary;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardholderName: ['', [Validators.required, Validators.minLength(3),Validators.maxLength(50), Validators.pattern(/^[^0-9]+$/)]],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expirationDate: ['', Validators.required],
      CVV: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      postalCode: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscriptionPlan = history.state.plan;
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      this.paymentData = {
        ...this.paymentForm.value,
        total : this.subscriptionPlan.billedNow.slice(1),
      };
      console.log("Payment data:", this.paymentData);
      
    } else {
      console.log("Form is invalid");
      this.paymentForm.markAllAsTouched();
    }
  }
}
