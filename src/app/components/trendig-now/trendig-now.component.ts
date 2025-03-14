import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  HostListener
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-trendig-now',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trendig-now.component.html',
  styleUrls: ['./trendig-now.component.css']
})
export class TrendigNowComponent implements OnInit, AfterViewInit {
  topRatedMovies: any[] = [];
  @ViewChild('carousel') carousel!: ElementRef;
  private carouselAnimation!: gsap.core.Tween;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const API_KEY = 'c7eb9bb55626d5a061ebacc94e80a8e1';
    const BASE_URL = 'https://api.themoviedb.org/3/movie/top_rated';
    const url = `${BASE_URL}?api_key=${API_KEY}&language=en-US&page=1`;

    this.http.get(url).subscribe(
      (data: any) => {
        this.topRatedMovies = data.results;
        this.duplicateMovies();
      },
      (error) => {
        console.error('Error fetching movies:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    this.initCarousel();
  }

  duplicateMovies(): void {
    this.topRatedMovies = [...this.topRatedMovies, ...this.topRatedMovies];
  }

  initCarousel(): void {
    this.carouselAnimation = gsap.to(this.carousel.nativeElement, {
      x: '-50%',
      duration: 10,
      ease: 'linear',
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % 100)
      }
    });
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.carouselAnimation.pause();
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.carouselAnimation.resume();
  }
}