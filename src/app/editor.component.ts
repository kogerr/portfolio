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
  imagesURL = 'api/images';

  removeCover = function () {
    this.removeImage('cover-image', this.post.cover).subscribe(data => delete this.post.cover);
  };

  uploadCover = function (event): void {
    if (this.post.cover) {
      this.removeCover();
    }
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('cover-image', file);
    this.http.post(this.imagesURL, formData).subscribe(data => this.post.cover = data.name);
  };

  removeImage = function (fieldname, filename): void {
    return this.http.delete((this.imagesURL + '/' + fieldname + '/' + filename));
  };

  uploadPost = function (): void {
    this.post.creationDate = new Date();
    let URL = 'api/posts';
    this.http.post(URL, this.post).subscribe(
      data => { this.submitted = true; this.success = true; },
      error => { this.submitted = true; this.error = error; }
    );
    this.countdownNavigate();
  };

  countdownNavigate = function (): void {
    this.remaining = 3;
    let redirect = window.setInterval(() => {
      this.remaining--;
      if (this.remaining <= 0) {
        window.clearInterval(redirect);
        this.router.navigate(['/work']);
      }
    }, 1000);
  };
}
