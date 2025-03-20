import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule, RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent  implements OnInit{
  showPassword = false;
  inValidUser = false;
  user = { username: '', password: '' };
  showAlert: boolean = false;


  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute) {}
  
  loginFormValidation = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    password: new FormControl(null, [
      Validators.minLength(6),
      Validators.required,
    ]),
  });
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
  get name() {
    return this.loginFormValidation.get('name');
  }
  get password() {
    return this.loginFormValidation.get('password');
  }
  login() {
    this.authService
      .login(this.user.username, this.user.password)
      .subscribe((users) => {
        const validUser = users.find(
          (u: any) =>
            u.username === this.user.username &&
            u.password === this.user.password
        );
        if (validUser) {
          localStorage.setItem('loggedInUser', JSON.stringify(validUser));
          // console.log(localStorage.getItem('loggedInUser'));
          this.router.navigate(['/home']);
        } else {
          this.inValidUser = true;
        }
      });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
