import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.css',
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  recommendations: any[] = [];
  visibleRecommendations: any[] = [];
  showMore: boolean = false;
  displayedCount: number = 3;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    public sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const movieId = params['id'];
      if (movieId) {
        this.fetchMovieDetails(movieId);
        this.fetchMovieRecommendations(movieId);
      }
    });
  }

  fetchMovieDetails(movieId: number): void {
    this.movieService.fetchMovieDetails(movieId).subscribe({
      next: (movie) => {
        console.log('Full Movie Response:', movie);
        this.movie = movie;
        this.movie.genreNames =
          movie.genres?.map((g: { name: string }) => g.name).join(' + ') ||
          'No Genres Available';
        this.movie.vote_average = parseFloat(
          this.movie.vote_average.toFixed(1)
        );
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
      },
    });
  }

  fetchMovieRecommendations(movieId: number): void {
    this.movieService.fetchMovieRecommendations(movieId).subscribe({
      next: (res) => {
        console.log('Fetched Recommendations:', res.results);
        this.recommendations =
          res.results?.map((recMovie: { vote_average: number }) => {
            recMovie.vote_average = parseFloat(
              recMovie.vote_average.toFixed(1)
            );
            return recMovie;
          }) || [];
        this.updateVisibleRecommendations();
      },
      error: (err) => {
        console.error('Error fetching recommendations:', err);
      },
    });
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.displayedCount += 3;
    } else {
      this.displayedCount = Math.max(this.displayedCount - 3, 3);
    }
    this.updateVisibleRecommendations();
  }

  updateVisibleRecommendations(): void {
    this.visibleRecommendations = this.recommendations.slice(
      0,
      this.displayedCount
    );
  }
}
