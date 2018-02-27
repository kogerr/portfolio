import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from './post';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent {
  constructor(private http: HttpClient, private router: Router) { }
  post = new Post();
  submitted = false;

  postAsJson = function(): string {
    return JSON.stringify(this.post);
  };

  uploadCover = function(event): void {
    let URL = 'api/images';
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('cover-image', file);
    this.http.post(URL, formData).subscribe(data => this.post.cover = data.name);
  };

  uploadPost = function(): void {
    this.post.creationDate = new Date();
    let URL = 'api/posts';
    this.http.post(URL, this.post).subscribe(
      data => { this.submitted = true; this.success = true; },
      error => { this.submitted = true; this.error = error; }
    );
    this.countdownNavigate();
  };

  countdownNavigate = function(): void {
    this.remaining = 5;
    let redirect = window.setInterval(() => {
      this.remaining--;
      if (this.remaining <= 0) {
        window.clearInterval(redirect);
        this.router.navigate(['/work']);
      }
    }, 1000);
  };
}
