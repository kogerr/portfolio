import { Component, OnInit } from '@angular/core';
import { Slide } from '../carousel-slide/slide';
import { CircularList } from './CircularList';
import { DataService } from '../data.service';

const roundInterval = 3000;

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  slides: CircularList<Slide>;
  current: Slide;
  next: Slide;
  offset = false;
  transition = false;
  periodicAnimation: NodeJS.Timer;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.loadSlides().subscribe(data => {
      this.slides = new CircularList(data);
      this.current = this.slides.next();
      this.next = this.current;
      this.setPeriodicAnimation();
    });
  }

  animateForward(): void {
    this.next = this.slides.next();
    this.transition = true;
    this.offset = true;
    setTimeout(() => {
      this.transition = false;
      this.current = this.next;
      this.offset = false;
    }, 1000);
  }

  animateBackward(): void {
    this.next = this.current;
    this.offset = true;
    this.current = this.slides.previous();
    setTimeout(() => { this.transition = true; this.offset = false; }, 50);
    setTimeout(() => { this.transition = false; }, 1050);
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
