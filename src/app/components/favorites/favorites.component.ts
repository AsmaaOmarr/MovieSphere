import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from "../discovery/components/movie-card/movie-card.component";

@Component({
  selector: 'app-favorites',
  imports: [CommonModule, MovieCardComponent],
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
  removeFromFavorites(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
