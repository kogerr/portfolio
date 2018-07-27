import { Component, OnInit, HostListener } from '@angular/core';
import { AdminDataService } from '../data.service';
import { DataService as CommonDataService } from '../../data.service';
import { Contact } from '../../models/contact';

@Component({
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.css']
})
export class ContactEditorComponent implements OnInit {
  content: Contact;
  update: { field: string, value: string };
  timer: NodeJS.Timer;
  opacity = 1;

  constructor(private dataService: AdminDataService, private commonDataService: CommonDataService) { }

  ngOnInit(): void {
    this.commonDataService.getContact().subscribe(data => this.content = data);
  }

  initChange(field: string, value: string): void {
    clearInterval(this.timer);
    this.timer = setTimeout(() => this.sendChange(field, value), 1000);
  }

  sendChange(field: string, value: string): void {
    this.dataService.updateContact({[field]: value}).subscribe(data => {
      if (data.success) {
        this.displaySuccess(field, value);
      }
    });
  }

  displaySuccess(field: string, value: string): void {
    this.update = { field, value };
    this.opacity = 1;
    setTimeout(() => this.opacity = 0, 1000);
    setTimeout(() => delete this.update, 2000);
  }

  @HostListener('window:copy', ['$event'])
  preventCopy(event: ClipboardEvent): void {
    event.clipboardData.setData('text/plain', 'botondvoros.hu');
    event.clipboardData.setData('text/html', '<b>botondvoros.hu</b>');
    event.preventDefault();
  }

  @HostListener('window:contextmenu', ['$event'])
  preventRightClick(event: MouseEvent): void {
    let coordinates = 'x: ' + event.x + ' y: ' + event.y;
    this.displaySuccess('coordinates', coordinates);
    event.preventDefault();
  }
}
