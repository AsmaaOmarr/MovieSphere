import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-discovery',
  imports: [MovieCardComponent],
  templateUrl: './discovery.component.html',
  styleUrl: './discovery.component.css',
})
export class DiscoveryComponent implements OnInit {
  movies: any[] = [];
  currentPage: number = 1;

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
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  nextPage(): void {
    this.currentPage++;
    this.fetchMovies();
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
}
