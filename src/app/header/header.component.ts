import { Component, OnInit, HostListener } from '@angular/core';

const breakPoint = 0.182;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  fullHeader = true;
  contactInfo = false;
  ongoingAnimation = false;

  @HostListener('window:scroll', ['$event'])
  onScroll = function ($event: Event): void {
    let breakPointY = window.innerWidth * breakPoint;
    if (!this.fullHeader) { breakPointY -= 40; }
    this.fullHeader = window.scrollY < breakPointY && window.innerWidth > 560;
    if (!this.ongoingAnimation && this.contactInfo) {
      this.switchContactHeader();
    }
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
