import { Component, OnInit } from '@angular/core';
import { Slide } from '../models/slide';
import { CircularList } from './CircularList';
import { DataService } from '../data.service';
import { DisplayedSlide } from './DisplayedSlide';

const roundInterval = 3000;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  slides: CircularList<Slide>;
  currentSlides: Array<DisplayedSlide>;
  transition = false;
  periodicAnimation: NodeJS.Timer;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.loadSlides().subscribe(data => {
      this.slides = new CircularList(data);
      this.setFirstSlides();
    });
  }

  setFirstSlides(): void {
    let i = -200;
    this.currentSlides = [this.slides.index.previous.value, this.slides.index.value, this.slides.index.next.value]
      .map(s => new DisplayedSlide(s, i += 100));
    this.setPeriodicAnimation();
  }

  animateForward(): void {
    this.transition = true;
    this.currentSlides.splice(0, 1);
    this.currentSlides[0].moveTo(-100);
    this.currentSlides[1].moveTo(0);
    let newSlide = new DisplayedSlide(this.slides.stepForward(), 100);
    this.currentSlides.push(newSlide);
    setTimeout(() => { this.transition = false; }, 1000);
  }

  animateBackward(): void {
    this.transition = true;
    this.currentSlides.splice(this.currentSlides.length - 1, 1);
    this.currentSlides[0].moveTo(0);
    this.currentSlides[1].moveTo(100);
    let newSlide = new DisplayedSlide(this.slides.stepBack(), -100);
    this.currentSlides = [newSlide, this.currentSlides[0], this.currentSlides[1]];
    setTimeout(() => { this.transition = false; }, 1000);
  }

  setPeriodicAnimation(): void {
    this.periodicAnimation = setInterval(() => this.animateForward(), roundInterval);
  }

  moveForward(): void {
    if (!this.transition) {
      clearInterval(this.periodicAnimation);
      this.animateForward();
      this.setPeriodicAnimation();
    }
  }

  moveBackward(): void {
    if (!this.transition) {
      clearInterval(this.periodicAnimation);
      this.animateBackward();
      this.setPeriodicAnimation();
    }
  }
}
