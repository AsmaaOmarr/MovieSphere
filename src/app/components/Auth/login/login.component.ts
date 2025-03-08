import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
    encapsulation: ViewEncapsulation.None 
  
})
export class LoginComponent {
  showPassword = false;

 
 togglePassword() {
   this.showPassword = !this.showPassword;
 }
}
