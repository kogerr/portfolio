import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { DataService } from '../data.service';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})

export class WorkComponent implements OnInit {
  posts: Array<Post>;

  ngOnInit(): void {
    this.dataService.loadPosts().subscribe((data) => { this.posts = data; });
  }

  constructor(private dataService: DataService) { }

}
