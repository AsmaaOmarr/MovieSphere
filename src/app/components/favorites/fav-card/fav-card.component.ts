import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from "../../button/button.component";

@Component({
  selector: 'app-fav-card',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './fav-card.component.html',
  styleUrl: './fav-card.component.css',
})
export class FavCardComponent {
  @Input() movie!: any;
  @Input() isFavorite: boolean = true;
  imgPath: string = 'https://image.tmdb.org/t/p/w500/';
}
