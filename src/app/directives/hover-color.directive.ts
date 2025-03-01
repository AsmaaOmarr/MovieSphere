import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { APP_COLORS } from '../constants';

@Directive({
  selector: '[appHoverColor]',
})
export class HoverColorDirective {
  @Input() hoverColor: string = APP_COLORS.secondary; // Default hover color
  @Input() defaultColor: string = 'white'; // Default text color

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Set default color on initialization
    this.el.nativeElement.style.setProperty(
      'color',
      this.defaultColor,
      'important'
    );
    this.el.nativeElement.style.setProperty(
      'transition',
      'color 0.3s ease-in-out',
      'important'
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.setProperty(
      'color',
      this.hoverColor,
      'important'
    );
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.setProperty(
      'color',
      this.defaultColor,
      'important'
    );
  }
}
