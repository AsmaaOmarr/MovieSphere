import { Component, OnInit } from '@angular/core';
import { APP_COLORS } from '../../constants';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnInit {
  constructor(private authService: AuthService) {}

  bgColor = APP_COLORS.sideBar;
  activeColor = APP_COLORS.secondary;
  activeItem = 'discovery';
  profileImage: string | ArrayBuffer | null =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';
  username: string = '';
  setActive(item: string) {
    this.activeItem = item;
  }
  logout() {
    console.log('Logging out...');
    this.authService.logout();
  }
  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.profileImage) {
        this.profileImage = userData.profileImage;
      }
      this.username = userData.username;
    }
  }
}
