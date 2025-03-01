import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { APP_COLORS } from '../../constants';
import { HoverColorDirective } from '../../directives/hover-color.directive';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, HoverColorDirective],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  bgColor: string = '#141414'; // Dark Background

  onMouseOver(event: any) {
    console.log(event);
    const target = event.target as HTMLElement;
    target.style.setProperty('color', APP_COLORS.secondary, 'important');
  }

  onMouseOut(event: any) {
    const target = event.target as HTMLElement;
    target.style.setProperty('color', 'white', 'important');
  }
}
