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
export class MovieCardComponent implements OnInit {
  imgPath: string = 'https://image.tmdb.org/t/p/w500/';
  @Input() movie!: any;
  @Input() isFavorite: boolean = false;
  @Output() action = new EventEmitter<void>();

  onClick() {
    this.action.emit();
  }

  ngOnInit(): void {
    // if (this.movie) {
    //   this.isFavorite = this.isFavorite =
    //     this.movieService.favoriteMoviesIds.includes(this.movie.id);
    // }
  }

  getFormattedRating(rating: number): string {
    return rating ? rating.toFixed(1) : 'N/A';
  }
}
