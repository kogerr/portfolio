import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { About } from '../structures/about.interface';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  content: About;

  constructor(private dataService: DataService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.dataService.getAbout().subscribe((data) => {
      this.content = data;
    });
  }

}
