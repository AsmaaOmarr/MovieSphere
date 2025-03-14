import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.checkScroll();
  }

  @HostListener('window:scroll', [])
  onScroll() {
    this.checkScroll();
  }

  private checkScroll() {
    const elementPosition = this.el.nativeElement.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;

    if (elementPosition < viewportHeight - 200) {
      this.renderer.addClass(this.el.nativeElement, 'animate');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'animate');
    }
  }
}



