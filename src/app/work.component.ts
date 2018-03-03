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

  ngOnInit(): void {
    const postsURL = 'api/db/posts';
    this.http.get<Post[]>(postsURL).subscribe((data) => { this.posts = data; });
  }

  constructor(private http: HttpClient, private router: Router) { }

  redirect = function (id) {
    this.router.navigate(['/work/' + id]);
  };
}
