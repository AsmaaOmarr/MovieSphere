import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-discovery',
  imports: [MovieCardComponent, CommonModule],
  templateUrl: './discovery.component.html',
  styleUrl: './discovery.component.css',
})
export class DiscoveryComponent implements OnInit {
  movies: any[] = [];
  currentPage: number = 1;
  totalPages: number = 500;
  showAlert: boolean = false;
  alertMessage: string = '';

  constructor(private movieService: MovieService) {}
  ngOnInit(): void {
    this.fetchMovies();
  }

  fetchMovies(): void {
    this.movieService.fetchMovies(this.currentPage).subscribe({
      next: (movies) => {
        this.movies = movies.results.map((movie: any) => ({
          ...movie,
          genre_names: movie.genre_ids.map(
            (id: number) => this.movieService.genreMap[id] || 'Unknown'
          ),
        }));
        console.log(this.movies);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  searchMovie(e: any): void {
    const query = e.target.value;
    if (!query.trim()) {
      this.fetchMovies();
      return;
    }
    this.movieService.searchMovie(query).subscribe({
      next: (movies) => {
        this.movies = movies.results;
      },
      error: (err) => console.log(err),
    });
  }
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.fetchMovies();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.fetchMovies();
    }
  }
  changePage(num: number): void {
    console.log(num);
    this.currentPage = num;
    this.fetchMovies();
  }

  isFavorite(id: number): boolean {
    return this.movieService.favoriteMoviesIds.includes(id);
  }
  onFavoriteToggled(isFavorite: boolean): void {
    this.alertMessage = isFavorite
      ? 'Movie added to favorites 💗'
      : 'Movie removed from favorites';
    this.showAlert = true;

    setTimeout(() => (this.showAlert = false), 3000);
  }
}
