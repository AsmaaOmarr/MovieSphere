import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { APP_COLORS } from '../constants';

@Directive({
  selector: '[appActiveBorder]',
})
export class ActiveBorderDirective implements AfterViewInit {
  private static activeElement: ElementRef | null = null; // Tracks the active item
  private static isFirstElement: boolean = true; // Flag to apply style to first element only once

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    // Apply border to the first element only once
    if (ActiveBorderDirective.isFirstElement) {
      this.setActiveBorder();
      ActiveBorderDirective.activeElement = this.el;
      ActiveBorderDirective.isFirstElement = false;
    }
  }
  @HostListener('click')
  onClick() {
    // Remove border from previously active element
    if (ActiveBorderDirective.activeElement) {
      this.renderer.setStyle(
        ActiveBorderDirective.activeElement.nativeElement,
        'border-left',
        '2px solid transparent'
      );
    }

    // Set border for clicked element
    this.setActiveBorder();
    ActiveBorderDirective.activeElement = this.el;
  }

  private setActiveBorder() {
    this.renderer.setAttribute(
      this.el.nativeElement,
      'style',
      `border-left: 2px solid ${APP_COLORS.secondary} !important;`
    );
  }
}
