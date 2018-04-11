import { Component, HostListener } from '@angular/core';

const breakPoint = 0.182;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fullHeader = true;
  contactInfo = false;
  ongoingAnimation = false;

  @HostListener('window:scroll', ['$event'])
  onScroll = function ($event: Event): void {
    this.fullHeader = window.scrollY < window.innerWidth * breakPoint && window.innerWidth > 560;
    if (!this.ongoingAnimation && this.contactInfo) {
      this.switchContactHeader();
    }
  };

  scrollUp = function (): void {
    window.scrollTo(0, 0);
  };

  scrollLock = function (): void {
    let currentY = window.scrollY;
    let stay = () => window.scrollTo(0, currentY);
    window.addEventListener('scroll', stay);
    setTimeout(() => window.removeEventListener('scroll', stay), 1000);
  };

  switchContactHeader = function (): void {
    this.contactInfo = !this.contactInfo;
    this.scrollLock();
    this.ongoingAnimation = true;
    setTimeout(() => this.ongoingAnimation = false, 1000);
  };
}
