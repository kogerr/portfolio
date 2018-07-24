import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../data.service';
import { DataService as CommonDataService } from '../../data.service';
import { Contact } from '../../models/contact';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.css']
})
export class ContactEditorComponent implements OnInit {
  content: Contact;
  timer: NodeJS.Timer;

  constructor(private dataService: AdminDataService, private commonDataService: CommonDataService) { }

  ngOnInit(): void {
    this.commonDataService.getContact().subscribe(data => this.content = data);
  }

  initChange(value: string, field: string): void {
    clearInterval(this.timer);
    this.timer = setTimeout(() => this.sendChange(value, field), 2000);
  }

  sendChange(value: string, field: string): void {
      let update = {};
      update[field] = value;
      this.dataService.updateContact(update).subscribe(data => console.log(data));
  }
}
