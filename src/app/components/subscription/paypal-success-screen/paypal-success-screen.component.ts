import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_COLORS } from '../../../constants';

@Component({
  selector: 'app-paypal-success-screen',
  imports: [CommonModule],
  templateUrl: './paypal-success-screen.component.html',
  styleUrl: './paypal-success-screen.component.css'
})
export class PaypalSuccessScreenComponent {
    constructor(private router: Router) {}
  
    secondary: string = APP_COLORS.secondary;

    navigateToHome() {
        this.router.navigate(['/home']);
    }
}
