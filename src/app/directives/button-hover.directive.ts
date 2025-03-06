import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import { APP_COLORS } from '../constants';

@Directive({
  selector: '[appButtonHover]',
})
export class ButtonHoverDirective implements OnInit {
  @Input() defaultColor: string = APP_COLORS.secondary;
  @Input() hoverColor: string = APP_COLORS.secondaryDark;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.defaultColor
    );
    this.renderer.setStyle(
      this.el.nativeElement,
      'transition',
      'all 0.3s ease-in-out'
    );
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.hoverColor
    );
    this.renderer.setStyle(this.el.nativeElement, 'scale', '1.04');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.el.nativeElement,
      'background-color',
      this.defaultColor
    );
    this.renderer.setStyle(this.el.nativeElement, 'scale', '1');
  }
}
