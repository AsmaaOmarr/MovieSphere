import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ButtonComponent } from './components/button/button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from "./components/home/home.component";
import { RegisterComponent } from "./components/Auth/register/register.component";
import { StartComponent } from "./components/Auth/start/start.component";
import { SliderComponent } from "./components/Auth/slider/slider.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterModule,
    ButtonComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    HomeComponent,
    RegisterComponent,
    StartComponent,
    SliderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {

  handleClick() {
    return alert('hi');
  }
}
