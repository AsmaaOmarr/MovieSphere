// number-counter.component.ts
import { CommonModule } from '@angular/common';
import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-most-reviewed',
  imports: [CommonModule],
  templateUrl: './most-reviewed.component.html',
  styleUrl: './most-reviewed.component.css'
})
export class MostReviewedComponent implements AfterViewInit {
  @ViewChild('counterSection', { static: false }) counterSection!: ElementRef;

  numbers = [
    { category: 'Action', count: 1200 },
    { category: 'Horror', count: 850 },
    { category: 'Romantic', count: 1150 }
  ];

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    gsap.fromTo(
      '.count-number',
      { innerText: 0 },
      {
        innerText: (i:any) => this.numbers[i].count,
        duration: 2,
        snap: 'innerText',
        scrollTrigger: {
          trigger: this.counterSection.nativeElement,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
  }


}
