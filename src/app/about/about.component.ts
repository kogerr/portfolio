import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PossiblyClickable } from './possibly-clickable';
import { TitledLines } from './titled-lines';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  clients: string[];
  awards: TitledLines[];
  printPublications: PossiblyClickable[];
  onlinePublications: PossiblyClickable[];
  arsPoetica1: string;
  arsPoetica2: string;
  exhibitions: string[];

  constructor(private dataService: DataService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    [this.clients, this.arsPoetica1, this.arsPoetica2, this.awards, this.printPublications, this.onlinePublications, this.exhibitions] = [
      ['Lorem Ipsum', 'Dolor Sit Amet', 'Consectetur Laboris Nisi', 'Adipiscing Elit', 'Exercitation Ullamco',
        'Aaliquip Commodo', 'Consequat Duis', 'Occaecat Cupidatat', 'Non Proident', 'Sunt in Culpa', 'Qui Officia',
        'Deserunt Mollit', 'Anim Estlaborum', 'Aaliquip Commodo', 'Lorem Ipsum', 'Dolor Sit Amet', 'Consectetur Laboris Nisi',
        'Adipiscing Elit', 'Exercitation Ullamco'],
      `I\'m a freelance graphic designer from Budapest, Hungary. I have an MA degree in Graphic Design
      from the Hungarian University of Fine Arts. Mainly focus on branding, identities, logos and trademarks.
      The goal of my work is to create simple, minimal and elegant creative solutions that are unique for the
      client and represent the value of the firm.`, `My mentality about graphics is about making things easily
      recognisable, simple, clean work suggesting continuity, eternity using traditional tools next to the
      systematized appearance.`,
      [{ title: 'lorem ipsum graphic awards', lines: ['Winner - Logo 2017', 'Project Name'] },
      { title: 'lorem ipsum graphic awards', lines: ['Winner - Logo 2017', 'Project Name', 'Winner - Packaging 2016', 'Project Name'] },
      { title: 'lorem ipsum graphic awards', lines: ['Winner - Logo 2017', 'Project Name'] },
      { title: 'lorem ipsum graphic awards', lines: ['Winner - Logo 2017', 'Project Name'] },
      { title: 'lorem ipsum graphic awards', lines: ['Winner - Logo 2017', 'Project Name', 'Winner - Packaging 2016', 'Project Name'] }],
      [{ text: 'Lorem Ipsum Dolor Sit Amet' }, { text: 'Consectetur Laboris Nisi Adipiscing Elit' },
      { text: 'Exercitation Ullamco Aaliquip Commodo' }, { text: 'Consequat DuisOccaecat Cupidatat' },
      { text: 'Non Proident Sunt in Culpa' }, { text: 'Qui Officia Deserunt Mollit' }, { text: 'Aaliquip Commodo' },
      { text: 'Lorem Ipsum Dolor Sit Amet' }, { text: 'Consectetur Laboris Nisi Adipiscing Elit' },
      { text: 'Exercitation Ullamco Aaliquip Commodo' }, { text: 'Consequat DuisOccaecat Cupidatat' },
      { text: 'Exercitation Ullamco', url: 'https://www.google.com' }],
      [{ text: 'Lorem Ipsum Dolor Sit Amet' }, { text: 'Consectetur Laboris Nisi Adipiscing Elit' },
      { text: 'Exercitation Ullamco Aaliquip Commodo' }, { text: 'Consequat DuisOccaecat Cupidatat' },
      { text: 'Non Proident Sunt in Culpa' }, { text: 'Qui Officia Deserunt Mollit' }, { text: 'Aaliquip Commodo' },
      { text: 'Lorem Ipsum Dolor Sit Amet' }, { text: 'Consectetur Laboris Nisi Adipiscing Elit' },
      { text: 'Exercitation Ullamco Aaliquip Commodo' }, { text: 'Consequat DuisOccaecat Cupidatat' },
      { text: 'Exercitation Ullamco', url: 'https://www.google.com' }],
      ['Lorem Ipsum', 'Dolor Sit Amet', 'Consectetur Laboris Nisi', 'Adipiscing Elit', 'Exercitation Ullamco',
        'Aaliquip Commodo', 'Consequat Duis', 'Occaecat Cupidatat', 'Non Proident', 'Sunt in Culpa', 'Qui Officia',
        'Deserunt Mollit', 'Anim Estlaborum', 'Aaliquip Commodo']

    ];
  }

}
