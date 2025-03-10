import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  imports: [RouterModule, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css',
})
export class MovieCardComponent {
  @Input() movie!: any;
  imgPath: string = 'https://image.tmdb.org/t/p/w500/';

  // Getter function to format rating
  getFormattedRating(rating: number): string {
    return rating ? rating.toFixed(1) : 'N/A';
  }
}
