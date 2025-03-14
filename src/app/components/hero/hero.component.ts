import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements AfterViewInit {
  @ViewChild('heroTitle') heroTitle!: ElementRef;
  @ViewChild('heroSubtitle') heroSubtitle!: ElementRef;
  @ViewChild('heroBg1', { static: true }) heroBg1!: ElementRef;
  @ViewChild('heroBg2', { static: true }) heroBg2!: ElementRef;


  ngAfterViewInit() {
    // Splitting the text into words for staggered animation
    const splitText = (element: ElementRef) => {
      const words = element.nativeElement.innerHTML.split(' ');
      element.nativeElement.innerHTML = words
        .map((word: string) => `<span class="word">${word}</span>`)
        .join(' ');
      return element.nativeElement.querySelectorAll('.word');
    };

    const titleWords = splitText(this.heroTitle);
    const subtitleWords = splitText(this.heroSubtitle);

    // Text Animation
    gsap.from(titleWords, {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    });

    gsap.from(subtitleWords, {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.5,
    });

  //background
    gsap.to(this.heroBg2.nativeElement, {
      opacity: 1,
      backgroundPositionY: '100%', // Moves the image up
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',

    });
    
    gsap.to(this.heroBg1.nativeElement, {
      backgroundPositionY: '-100%', 
      duration: 50, // speed (50 sec) 
      repeat: -1, // Infinite loop
      ease: 'linear',
    });



  }

}


