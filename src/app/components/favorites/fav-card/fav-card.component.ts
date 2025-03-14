import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { MovieService } from '../../../services/movie.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-fav-card',
  imports: [CommonModule, RouterModule],
  templateUrl: './fav-card.component.html',
  styleUrl: './fav-card.component.css',
})
export class FavCardComponent {
  @Input() movie!: any;
  @Input() isFavorite: boolean = true;
  imgPath: string = 'https://image.tmdb.org/t/p/w500/';
  @Output() deleteFav = new EventEmitter<void>();

  onClick(event: Event) {
    this.deleteFav.emit();
    event.stopPropagation(); // Stop event from bubbling to parent elements
    event.preventDefault(); // Prevent the default link behavior
  }
}
