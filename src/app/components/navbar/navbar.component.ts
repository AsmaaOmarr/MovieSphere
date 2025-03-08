import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_COLORS } from '../../constants';
import { HoverColorDirective } from '../../directives/hover-color.directive';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, HoverColorDirective, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  bgColor: string = APP_COLORS.primary; // Dark Background
  
  constructor(private router: Router) {}


  onMouseOver(event: any) {
    console.log(event);
    const target = event.target as HTMLElement;
    target.style.setProperty('color', APP_COLORS.secondary, 'important');
  }

  onMouseOut(event: any) {
    const target = event.target as HTMLElement;
    target.style.setProperty('color', 'white', 'important');
  }
  navigateToSubscribe() {
    this.router.navigate(['/home/subscribe']);
  }
}
