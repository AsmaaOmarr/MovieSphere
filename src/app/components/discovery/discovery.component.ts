import { Component } from '@angular/core';
import { MovieCardComponent } from './components/movie-card/movie-card.component';

@Component({
  selector: 'app-discovery',
  imports: [MovieCardComponent],
  templateUrl: './discovery.component.html',
})
export class DiscoveryComponent {
  movie = {
    id: 123,
    title: 'movie',
    poster_path: '/7iMBZzVZtG0oBug4TfqDb9ZxAOa.jpg',
  };
}
