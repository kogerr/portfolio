import { Component, Output, EventEmitter, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.css']
})
export class MobileMenuComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  @HostBinding('style.height') height = '0vh';

  ngOnInit(): void {
    this.rollDown();
  }

  rollDown(): void {
    let i = 0;
    let interval = setInterval(() => {
      this.height = i + 'vh';
      i += 4;
      if (i > 100) {
        clearInterval(interval);
      }
    }, 1);
  }

  closeMenu(): void {
    this.close.emit();
  }

}
