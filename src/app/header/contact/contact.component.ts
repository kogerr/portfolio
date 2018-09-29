import { Component, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact';

@Component({
  selector: 'header-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  @Input() content: Contact;
  @Output() close = new EventEmitter<boolean>();

}
