import { Component } from '@angular/core';
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { ValuesComponent } from "../values/values.component";

@Component({
  selector: 'app-about',
  imports: [HeroSectionComponent, ValuesComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
