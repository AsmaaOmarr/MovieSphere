import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnSameUrlNavigation, RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-movie-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  imgPath: string = 'https://image.tmdb.org/t/p/w500/';
  @Input() movie!: any;
  @Input() isFavorite: boolean = false;
  @Output() favoriteToggled = new EventEmitter<boolean>();

  constructor(private movieService: MovieService) {}

  getFormattedRating(rating: number): string {
    return rating ? rating.toFixed(1) : 'N/A';
  }
  toggleFavorite(event: Event, movieId: number) {
    this.movieService.toggleFavorite(movieId).subscribe({
      next: (response) => {
        this.isFavorite = !this.isFavorite;
        this.movieService.fetchMovies();
        this.favoriteToggled.emit(this.isFavorite);
      },
      error: (err) => {
        console.log(err);
      },
    });
    event.stopPropagation(); // Stop event from bubbling to parent elements
    event.preventDefault(); // Prevent the default link behavior
  }
}
