import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from '../discovery/movie-card/movie-card.component';
import { FavCardComponent } from './fav-card/fav-card.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, MovieCardComponent, FavCardComponent,RouterModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: any[] = [];
  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
    this.movieService.getFavorites().subscribe({
      next: (favorites) => {
        console.log(favorites);
        this.favoriteMovies = favorites.results.map((movie: any) => ({
          ...movie,
          genre_names: movie.genre_ids.map(
            (id: number) => this.movieService.genreMap[id] || 'Unknown'
          ),
        }));
      },
      error: (error) => console.error('Error:', error),
    });
  }
  isFavorite(id: number): boolean {
    return this.movieService.favoriteMoviesIds.includes(id);
  }

  toggleFavorite(movieId: number) {
    this.movieService.toggleFavorite(movieId).subscribe({
      next: (response) => {
        this.movieService.getFavorites().subscribe({
          next: (favorites) => {
            console.log(favorites);
            this.favoriteMovies = favorites.results.map((movie: any) => ({
              ...movie,
              genre_names: movie.genre_ids.map(
                (id: number) => this.movieService.genreMap[id] || 'Unknown'
              ),
            }));
          },
          error: (error) => console.error('Error:', error),
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
