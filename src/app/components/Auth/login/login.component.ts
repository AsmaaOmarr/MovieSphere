import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
    encapsulation: ViewEncapsulation.None 
  
})
export class LoginComponent {
  showPassword = false;
  inValidUser=false;
  user = { username: '', password: '' };

  constructor(private authService: AuthService,private router:Router) {}
loginFormValidation= new FormGroup({

  name: new FormControl(null, [Validators.required, Validators.minLength(4)]),
  password:new FormControl(null,[Validators.minLength(6),Validators.required])
 },

);
get name (){
  return this.loginFormValidation.get("name")
}
get password (){
  return this.loginFormValidation.get("password")
}
  login() {
    this.authService.login(this.user.username, this.user.password).subscribe(users =>
       {
      const validUser = users.find((u:any) => u.username === this.user.username && u.password === this.user.password);
      if (validUser) {
        localStorage.setItem('loggedInUser', JSON.stringify(validUser));
        this.router.navigate(["/home"])
      } else {
       this.inValidUser=true;
      }
    });
  }
 
 togglePassword() {
   this.showPassword = !this.showPassword;
 }
}
