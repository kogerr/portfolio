import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { About } from '../models/about.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  content: About;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getAbout().subscribe((data) => {
      this.content = data;
    });
  }

}
