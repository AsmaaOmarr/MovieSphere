import { Component } from '@angular/core';
import { SliderComponent } from "../slider/slider.component";
import { RouterModule } from '@angular/router';
import { APP_COLORS } from '../../../constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-start',
  imports: [SliderComponent,RouterModule,CommonModule],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css'
})
export class StartComponent {
 bgColor: string = APP_COLORS.secondaryDark;

}
