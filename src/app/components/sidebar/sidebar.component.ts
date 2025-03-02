import { Component } from '@angular/core';
import { APP_COLORS } from '../../constants';
import { CommonModule } from '@angular/common';
import { ActiveBorderDirective } from '../../directives/active-border.directive';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, ActiveBorderDirective, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  bgColor = APP_COLORS.sideBar;
  activeColor = APP_COLORS.secondary;
  activeItem = 'discovery';
  setActive(item: string) {
    this.activeItem = item;
  }
  
}
