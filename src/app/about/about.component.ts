import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  clients: string[];
  awards: string[];
  publications: string[];
  arsPoetica1: string;
  arsPoetica2: string;

  constructor(private dataService: DataService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    [this.clients, this.arsPoetica1, this.arsPoetica2, this.awards, this.publications] = [[], '[]', '[]', [], []];
  }

}
