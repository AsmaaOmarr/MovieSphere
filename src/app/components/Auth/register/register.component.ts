import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { APP_COLORS } from '../../../constants';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  bgColor: string = APP_COLORS.secondaryDark;
  showConfirmPassword = false;
  showPassword = false;
  user = { username: '', email: '', password: '', isSubscribed: false };
  errorMessage: string = '';  

  constructor(private authService: AuthService, private router: Router) {}

  static passwordMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirm')?.value;
    return password && confirm && password === confirm
      ? null
      : { notMatching: true };
  }

  registerFormValidation = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [
      Validators.minLength(6),
      Validators.required,
    ]),
    confirm: new FormControl('', [Validators.required]),
  });

  get name() {
    return this.registerFormValidation.get('name');
  }
  get email() {
    return this.registerFormValidation.get('email');
  }

  get password() {
    return this.registerFormValidation.get('password');
  }
  get confirm() {
    return this.registerFormValidation.get('confirm');
  }

  register() {
    this.authService.register(this.user).subscribe(
      (createdUser) => {
        localStorage.setItem('loggedInUser', JSON.stringify(createdUser));
        this.router.navigate(['/home']);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
