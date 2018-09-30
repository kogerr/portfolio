import { Component, Input, OnInit } from '@angular/core';
import { Post, ContentType, ContentImage } from '../models/post';
import { DataService } from '../data.service';

@Component({
  selector: 'app-preloader',
  template: `<img *ngFor="let image of images" img [src]="'images/' + image">`,
  styles: [':host {display: none}']
})
export class PreloaderComponent implements OnInit {
  images: Array<string>;
  ngOnInit(): void {
    this.dataService.getPreloadImages().subscribe((data) => { this.images = data; });
  }

  constructor(private dataService: DataService) { }

}
