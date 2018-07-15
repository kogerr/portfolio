import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { AdminDataService } from '../data.service';
import { DataService as CommonDataService } from '../../data.service';

@Component({
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit {

  constructor(private dataService: AdminDataService, private commonDataService: CommonDataService) { }

  posts: Post[];

  ngOnInit(): void {
    this.commonDataService.loadPosts().subscribe((data) => { this.posts = data; });
  }

  removePost(index: number): void {
    this.dataService.deletePost(this.posts[index].titleURL).subscribe(() => {
      this.posts.splice(index, 1);
      this.shiftIndices(index);
    });
  }

  movePostUp(index: number): void {
    if (index > 0) {
      let previous = this.posts[index - 1];
      this.posts[index - 1] = this.posts[index];
      this.posts[index] = previous;
      this.posts[index].index++;
      this.posts[index - 1].index--;
      this.updateIndex([index, index - 1]);
    }
  }

  movePostDown(index: number): void {
    if (index < this.posts.length - 1) {
      let next = this.posts[index + 1];
      this.posts[index + 1] = this.posts[index];
      this.posts[index] = next;
      this.posts[index].index--;
      this.posts[index + 1].index++;
      this.updateIndex([index, index + 1]);
    }
  }

  updateIndex(index: number[]): void {
    let indexPairs = new Array<{ index: number, titleURL: string }>();
    index.forEach(i => {
      indexPairs.push({ index: this.posts[i].index, titleURL: this.posts[i].titleURL });
    });
    this.dataService.updatePostIndices(indexPairs).subscribe(() => { });
  }

  shiftIndices(from: number): void {
    let indexPairs = new Array<{ index: number, titleURL: string }>();
    for (let i = from; i < this.posts.length; i++) {
      this.posts[i].index--;
      indexPairs.push({ index: this.posts[i].index, titleURL: this.posts[i].titleURL });
    }
    this.dataService.updatePostIndices(indexPairs).subscribe(() => { });
  }

}
