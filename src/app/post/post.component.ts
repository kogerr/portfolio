import { Component, OnInit, OnDestroy, HostListener, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { Post } from '../models/post';
import { MetatagService } from '../metatag.service';

const origialTitle = 'Portfolio';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, AfterViewChecked, OnDestroy {
  post: Post;
  videos: Array<HTMLVideoElement>;

  constructor(private dataService: DataService, private route: ActivatedRoute,
    private titleService: Title, private router: Router, private metatagService: MetatagService) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.dataService.getPost(p.titleURL).subscribe(data => {
        this.post = data;
        this.titleService.setTitle(data.title);
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
    this.videos.filter(e => this.isInView(e)).forEach(e => e.play());
  }

  isInView(element: HTMLElement): boolean {
    let [bottom, top]: [number, number] = [element.getBoundingClientRect().bottom, element.getBoundingClientRect().top];
    return bottom < window.innerHeight || (bottom > window.innerHeight && top <= 0);
  }

  redirectNext(): void {
    this.dataService.getNextPostTitleUrl(this.post.titleURL).subscribe(data => {
      this.redirect(data.titleURL);
    });
  }

  redirectPrevious(): void {
    this.dataService.getPreviousPostTitleUrl(this.post.titleURL).subscribe(data => {
      this.redirect(data.titleURL);
    });
  }

  redirect(titleUrl: string = ''): void {
    window.scrollTo({ top: 0, behavior: 'instant' });
    this.router.navigate(['/work/' + titleUrl]);
  }

  getWidth(width: number): string {
    if (window.innerWidth > 796) {
      return width + '%';
    } else {
      return '100%';
    }
  }

  ngOnDestroy(): void {
    this.titleService.setTitle(origialTitle);
  }
}
