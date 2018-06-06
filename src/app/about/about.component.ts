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
    [this.clients, this.arsPoetica1, this.arsPoetica2, this.awards, this.publications] = [
    ['Lorem Ipsum', 'Dolor Sit Amet', 'Consectetur Laboris Nisi', 'Adipiscing Elit', 'Exercitation Ullamco',
      'Aaliquip Commodo', 'Consequat Duis', 'Occaecat Cupidatat', 'Non Proident', 'Sunt in Culpa', 'Qui Officia',
      'Deserunt Mollit', 'Anim Estlaborum', 'Aaliquip Commodo', 'Lorem Ipsum', 'Dolor Sit Amet', 'Consectetur Laboris Nisi',
      'Adipiscing Elit', 'Exercitation Ullamco'],
      `I\'m a freelance graphic designer from Budapest, Hungary. I have an MA degree in Graphic Design
      from the Hungarian University of Fine Arts. Mainly focus on branding, identities, logos and trademarks.
      The goal of my work is to create simple, minimal and elegant creative solutions that are unique for the
      client and represent the value of the firm.`, `My mentality about graphics is about making things easily
      recognisable, simple, clean work suggesting continuity, eternity using traditional tools next to the
      systematized appearance.`, [], []];
  }

}
