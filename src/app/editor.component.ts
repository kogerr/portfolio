import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Post } from './post';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent {
  constructor(private http: HttpClient, private router: Router) { }
  post = new Post();
  submitted = false;
  imagesURL = 'api/images/';

  uploadCover = function (event): void {
    if (this.post.cover) {
      this.removeCover();
    }
    this.postImage('cover', event.target.files[0]).subscribe(data => this.post.cover = data.name);
  };

  removeCover = function (): void {
    this.removeImage('cover', this.post.cover).subscribe(data => delete this.post.cover);
  };

  uploadContentImages = function (event): void {
    if (this.post.images && this.post.images.length > 0) {
      this.removeContentImages();
    } else {
      this.post.images = new Array<string>();
    }
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.postImage('content', files[i]).subscribe(data => this.post.images.push(data.name));
    }
  };

  removeContentImages = function (): void {
    this.post.images.forEach(element => {
      this.removeImage('content', element).subscribe(data => this.post.images.splice(this.post.images.indexOf(element)));
    });
  };

  postImage = function (imageType: string, file): Observable<any> {
    let formData = new FormData();
    formData.append('image', file);
    return this.http.post(this.imagesURL + imageType, formData);
  };

  removeImage = function (fieldname, filename): Observable<any> {
    return this.http.delete((this.imagesURL + fieldname + '/' + filename));
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
