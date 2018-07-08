import { Component, Input } from '@angular/core';
import { Slide } from './slide';

@Component({
  selector: 'app-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrls: ['./carousel-slide.component.css']
})
export class CarouselSlideComponent {

  @Input()
  slide: Slide;

}
