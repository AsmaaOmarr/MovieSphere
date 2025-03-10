import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OnSameUrlNavigation, RouterModule } from '@angular/router';
import { MovieService } from '../../../services/movie.service';

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

  constructor(private movieService: MovieService) {}

  getFormattedRating(rating: number): string {
    return rating ? rating.toFixed(1) : 'N/A';
  }
  toggleFavorite(movieId: number) {
    this.movieService.toggleFavorite(movieId).subscribe({
      next: (response) => {
        this.isFavorite = !this.isFavorite;
        this.movieService.fetchMovies();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
