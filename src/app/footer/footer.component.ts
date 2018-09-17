import { Component, Input } from '@angular/core';
import { Contact } from '../models/contact';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() content: Contact;

  scrollUp(): void {
    window.scrollTo(0, 0);
  }
}
