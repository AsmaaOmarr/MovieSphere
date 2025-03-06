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
  @Input() id!: number;
  @Input() title!: string;
  @Input() posterPath!: string;

  imgPath: string = 'https://image.tmdb.org/t/p/w500/';
}
