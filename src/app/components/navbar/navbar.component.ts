import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APP_COLORS } from '../../constants';
import { HoverColorDirective } from '../../directives/hover-color.directive';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, HoverColorDirective, ButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  bgColor: string = APP_COLORS.primary; // Dark Background
  profileImage: string | ArrayBuffer | null =
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541';

  constructor(private router: Router, private authService: AuthService) {}

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
  ngOnInit(): void {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      if (userData.profileImage) {
        this.profileImage = userData.profileImage;
      }
    }
  }
}
