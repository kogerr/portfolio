import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { DataService } from '../data.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})

export class WorkComponent implements OnInit {
  posts: Post[];

  ngOnInit(): void {
    this.dataService.loadPosts().subscribe((data) => { this.posts = data; });
  }

  constructor(private dataService: DataService, private router: Router) { }

  redirect(titleURL): void {
    this.router.navigate(['/work/' + titleURL]);
  }
}
