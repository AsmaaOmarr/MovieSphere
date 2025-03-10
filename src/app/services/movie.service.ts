import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '9813ce01a72ca1bd2ae25f091898b1c7';
  public genreMap: { [key: number]: string } = {}; // Store genre names
  constructor(private http: HttpClient) {
    this.loadGenres(); // Fetch genres once when the service starts
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
    return this.http.get<any>(
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&&page=${page}`
    );
  }
}
