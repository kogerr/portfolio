import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CarouselDisplay } from './CarouselDisplay';

const roundInterval = 3000;
const transitionTime = 1000;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  display: CarouselDisplay;
  transition = false;
  periodicAnimation: NodeJS.Timer;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.loadSlides().subscribe(data => {
      this.display = new CarouselDisplay(data, transitionTime);
      this.setPeriodicAnimation();
    });
  }

  animateForward(): void {
    this.display.next();
  }

  animateBackward(): void {
    this.display.previous();
  }

  setPeriodicAnimation(): void {
    this.periodicAnimation = setInterval(() => this.animateForward(), roundInterval);
  }

  moveForward(): void {
    if (!this.display.locked) {
      clearInterval(this.periodicAnimation);
      this.animateForward();
      this.setPeriodicAnimation();
    }
  }

  moveBackward(): void {
    if (!this.display.locked) {
      clearInterval(this.periodicAnimation);
      this.animateBackward();
      this.setPeriodicAnimation();
    }
  }

}
