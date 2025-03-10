import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '81c3382e25511de5c10ab3c8d844e823';
  public genreMap: { [key: number]: string } = {}; // Store genre names
  public favoriteMoviesIds: number[] = [];

  constructor(private http: HttpClient) {
    this.loadGenres(); // Fetch genres once when the service starts
    this.updateFavoriteList();
  }

  // Load genres and store them
  private loadGenres(): void {
    this.http
      .get<any>(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}`
      )
      .subscribe((response) => {
        response.genres.forEach((genre: any) => {
          this.genreMap[genre.id] = genre.name;
        });
      });
  }

  // Fetch movies
  fetchMovies(page: number = 1): Observable<any> {
    this.updateFavoriteList();
    return this.http.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&&page=${page}`
    );
  }
  // search for movie
  searchMovie(query: string): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${query}`
    );
  }

  getFavorites(): Observable<any> {
    return this.http.get(
      `https://api.themoviedb.org/3/account/21849475/favorite/movies?api_key=${this.apiKey}`,
      {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWMzMzgyZTI1NTExZGU1YzEwYWIzYzhkODQ0ZTgyMyIsIm5iZiI6MTc0MDc0NTcyOS44MDE5OTk4LCJzdWIiOiI2N2MxYWMwMWM5MzI3MTQ5MWYzNWM2ZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lwjVio0S9VUL4z0-tvj2fX93T1K67waT6mRiGEy6BuI',
        },
      }
    );
  }

  updateFavoriteList(): void {
    this.getFavorites().subscribe((response) => {
      this.favoriteMoviesIds = response.results.map((movie: any) => movie.id); // Store IDs
      // console.log(this.favoriteMoviesIds);
    });
  }
  toggleFavorite(movieId: number): Observable<any> {
    const isFavorite = this.favoriteMoviesIds.includes(movieId);

    return this.http.post(
      `https://api.themoviedb.org/3/account/21849475/favorite?api_key=${this.apiKey}`,
      {
        media_type: 'movie',
        media_id: movieId,
        favorite: !isFavorite,
      },
      {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWMzMzgyZTI1NTExZGU1YzEwYWIzYzhkODQ0ZTgyMyIsIm5iZiI6MTc0MDc0NTcyOS44MDE5OTk4LCJzdWIiOiI2N2MxYWMwMWM5MzI3MTQ5MWYzNWM2ZGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lwjVio0S9VUL4z0-tvj2fX93T1K67waT6mRiGEy6BuI',
        },
      }
    );
  }
}
