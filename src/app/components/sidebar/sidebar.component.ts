import { Component } from '@angular/core';
import { APP_COLORS } from '../../constants';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  bgColor = APP_COLORS.sideBar;
  activeColor = APP_COLORS.secondary;
  activeItem = 'discovery';
  setActive(item: string) {
    this.activeItem = item;
  }

}
