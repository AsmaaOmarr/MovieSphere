import { Component, ViewEncapsulation } from '@angular/core';
import { APP_COLORS } from '../../../constants';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrl:'./register.component.css',
  encapsulation: ViewEncapsulation.None 
})
export class RegisterComponent {
 bgColor: string = APP_COLORS.secondaryDark;
 showConfirmPassword = false;
 showPassword = false;

 toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}
togglePassword() {
  this.showPassword = !this.showPassword;
}
}
