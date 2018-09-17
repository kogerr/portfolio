import { Component, HostListener, Input } from '@angular/core';
import { Contact } from '../models/contact';

const breakPoint = 0.182;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() content: Contact;
  fullHeader = true;
  contactInfo = false;
  ongoingAnimation = false;
  mobileMenu = false;

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    if (this.mobileView()) {
      this.mobileMenu = false;
      return;
    }
    let breakPointY = window.innerWidth * breakPoint;
    if (!this.fullHeader) { breakPointY -= 40; }
    this.fullHeader = window.scrollY < breakPointY;
    if (!this.ongoingAnimation && this.contactInfo) {
      this.switchContactHeader();
    }
  }

  scrollLock(): void {
    let currentY = window.scrollY;
    let stay = () => window.scrollTo(0, currentY);
    window.addEventListener('scroll', stay);
    setTimeout(() => window.removeEventListener('scroll', stay), 1000);
  }

  switchContactHeader(): void {
    this.contactInfo = !this.contactInfo;
    this.scrollLock();
    this.ongoingAnimation = true;
    setTimeout(() => this.ongoingAnimation = false, 1000);
  }

  mobileView(): boolean {
    return window.innerWidth <= 640;
  }
}
