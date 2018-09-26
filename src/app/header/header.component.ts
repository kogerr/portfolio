import { Component, HostListener, Input } from '@angular/core';
import { Contact } from '../models/contact';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  mobileMenu = false;
  ongoingAnimation = false;
  yellow = false;

  constructor(router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationStart))
      .subscribe(e => this.handleRouteChange(e as NavigationStart));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    if (this.mobileView()) {
      this.mobileMenu = false;
      return;
    }
    let breakPointY = window.innerWidth * breakPoint;
    if (!this.fullHeader) { breakPointY -= 40; }
    this.fullHeader = window.scrollY < breakPointY;
    if (!this.ongoingAnimation) {
      this.contactInfo = false;
    }
  }

  mobileView(): boolean {
    return window.innerWidth <= 640;
  }

  dropDown(): void {
    this.contactInfo = true;
    this.ongoingAnimation = true;
    setTimeout(() => { this.ongoingAnimation = false; }, 800);
  }

  handleRouteChange(navigationStart: NavigationStart): any {
    this.yellow = navigationStart.url.startsWith('/work/');
  }

}
