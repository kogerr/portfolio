import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from './data.service';
import { Post } from './post';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(private dataService: DataService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    let self = this;
    this.route.params.subscribe(p => {
      this.dataService.getPost(p.titleURL).subscribe(function (data) {
        self.post = data;
        self.titleService.setTitle(data.title);
      });
    });
  }
}
