import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { Post, ContentType, ContentImage } from '../models/post';

const delay = 700;

@Component({
  selector: 'app-preloader',
  template: `<img src="assets/logo_small.svg"><img *ngFor="let image of images" [src]="'images/' + image">`,
  styles: [':host {display: none}']
})
export class PreloaderComponent implements OnInit {
  @Input() set posts(posts: Array<Post>) {
    this.setImages(posts);
  }

  images = new Array<string>();
  timeout: NodeJS.Timer;

  ngOnInit(): void {
    if (!this.timeout) {
      let update = () => this.dataService.getPreloadImages().subscribe((data) => { this.images = data; });
      this.timeout = setTimeout(() => update(), delay);
    }
  }

  constructor(private dataService: DataService) { }

  setImages(posts: Array<Post>): void {
    let coverImages = posts.map(p => p.cover);
    let contentImages = posts.map(p => p.contents.filter(c => c.type === ContentType.image)[0])
        .filter(x => x).map(i => (i as ContentImage).name);
    this.timeout = setTimeout(() => this.images = [...coverImages, ...contentImages], delay);
  }

}
