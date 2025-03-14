import { Component } from '@angular/core';
import { HeroComponent } from "../../components/hero/hero.component";
import { BenefitComponent } from "../../components/benefit/benefit.component";
import { FoundersComponent } from "../../components/founders/founders.component";
import { MostReviewedComponent } from "../../components/most-reviewed/most-reviewed.component";
import { TrendigNowComponent } from "../../components/trendig-now/trendig-now.component";
import { ScrollAnimationDirective } from '../../directives/scroll-animation.directive';


@Component({
  selector: 'app-about-page',
  imports: [HeroComponent, BenefitComponent, FoundersComponent, MostReviewedComponent, TrendigNowComponent,ScrollAnimationDirective],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.css'
})
export class AboutPageComponent {
  
}
