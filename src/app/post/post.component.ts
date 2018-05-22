import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data.service';
import { Post } from '../post';

const origialTitle = 'Portfolio';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {
  post: Post;

  constructor(private dataService: DataService, private route: ActivatedRoute, private titleService: Title, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.dataService.getPost(p.titleURL).subscribe(data => {
        this.post = data;
        this.titleService.setTitle(data.title);
      });
    });
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

  ngOnDestroy(): void {
    this.titleService.setTitle(origialTitle);
  }
}
