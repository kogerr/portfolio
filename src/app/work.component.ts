import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from './post';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})

export class WorkComponent implements OnInit {
  posts: Post[];
  testPost = { 'title': 'asdf', 'client': 'asdf', 'text': 'lorem ipsum dolor sit amet',
  'cover': 'cover000001.jpg', 'creationDate': '2018-02-27T15:54:40.782Z', 'id': 7 };
  ngOnInit(): void {
    const postsURL = 'api/posts';
    this.http.get<Post[]>(postsURL).subscribe((data) => { this.posts = data; });
  }
  constructor(private http: HttpClient, private router: Router) { }
  stringify = function(sg): string { // remove in production
    return JSON.stringify(sg);
  };
}
