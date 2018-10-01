import { Component, OnInit, OnDestroy, HostListener, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { Post } from '../models/post';
import { MetatagService } from '../metatag.service';

const origialTitle = 'Botond Vörös';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewChecked, OnDestroy {
  post: Post;
  videos: Array<HTMLVideoElement>;
  startedVideos = new Array<HTMLVideoElement>();
  previousTitleURL = '';
  nextTitleURL = '';

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private titleService: Title, private router: Router, private metatagService: MetatagService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.dataService.getPost(p.titleURL).subscribe(data => {
        this.post = data;
        this.titleService.setTitle(data.title);
        this.setPrevAndNext(250);
        this.metatagService.update({
          title: data.title, url: data.titleURL, description: data.facebookDescription, image: data.facebookImage
        });
      });
    });
  }

  ngAfterViewChecked(): void {
    this.videos = Array.from(window.document.getElementsByTagName('video'));
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.videos.filter(e => this.isInView(e) && this.startedVideos.indexOf(e) < 0).forEach(e => {
      e.play();
      this.startedVideos.push(e);
    });
    this.videos.filter(e => !this.isInView(e) && this.startedVideos.indexOf(e) >= 0).forEach(e => {
      e.pause();
      this.startedVideos.splice(this.startedVideos.indexOf(e), 1);
    });
  }

  isInView(element: HTMLVideoElement): boolean {
    let [bottom, top]: [number, number] = [element.getBoundingClientRect().bottom, element.getBoundingClientRect().top];
    return bottom < window.innerHeight || (bottom > window.innerHeight && top <= 0);
  }

  getWidth(width: number): string {
    if (window.innerWidth > 796) {
      return width + '%';
    } else {
      return '100%';
    }
  }

  scrollDown(): void {
    window.document.getElementsByClassName('margin-wrap')[0].scrollIntoView();
  }

  setPrevAndNext(delay?: number): void {
    let set = () => { this.dataService.getSurroundingPostTitleUrls(this.post.titleURL).subscribe(data => {
      [this.previousTitleURL, this.nextTitleURL] = [data.previous, data.previous];
    });
    };
    if (delay) {
      setTimeout(() => set(), delay);
    } else {
      set();
    }
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(origialTitle);
  }
}
