import { Component, HostListener, OnInit } from '@angular/core';
import { Contact } from '../models/contact';
import { DataService } from '../data.service';

const breakPoint = 0.182;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  content: Contact;
  fullHeader = true;
  contactInfo = false;
  ongoingAnimation = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getContact().subscribe(data => {
      this.content = data;
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event): void {
    let breakPointY = window.innerWidth * breakPoint;
    if (!this.fullHeader) { breakPointY -= 40; }
    this.fullHeader = window.scrollY < breakPointY && window.innerWidth > 560;
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
}
