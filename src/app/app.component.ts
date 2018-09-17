import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Contact } from './models/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  contact: Contact;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getContact().subscribe(data => {
      this.contact = data;
    });
  }
}
