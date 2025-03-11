import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { APP_COLORS } from '../../../constants';

@Component({
  selector: 'app-slider',
  imports: [CommonModule],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit{
  bgColor: string = APP_COLORS.secondaryDark;
  ngOnInit() {
    console.log("Slider Loaded"); 
  }
}
