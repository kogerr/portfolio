import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  post: Post;

  constructor(private http: HttpClient, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    let self = this;
    this.route.params.subscribe(p => {
      this.http.get<Post>('api/posts/' + p.id).subscribe(function (data) {
        self.post = data;
        self.titleService.setTitle(data.title);
      });
    });
  }
}
