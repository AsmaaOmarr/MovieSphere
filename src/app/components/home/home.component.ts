import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-home',
  imports: [RouterModule, RouterOutlet, SidebarComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
