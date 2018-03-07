import { Component, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Post } from './post';
import { ContentImage } from './content-image';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnDestroy {
  constructor(private http: HttpClient, private router: Router) { }
  post = new Post();
  submitted = false;
  imagesURL = 'api/images/';

  ngOnDestroy(): void {
    if (!this.submitted && this.post.cover) {
      this.removeCover();
    }
    if (!this.submitted && this.post.images && this.post.images.length > 0) {
      this.removeContentImages();
    }
  }

  uploadCover = function (event): void {
    if (this.post.cover) {
      this.removeCover();
    }
    let self = this;
    this.postImage('cover', event.target.files[0]).subscribe(function (data) {
      self.resizeImage('cover', data.name).subscribe(function (response) {
        self.post.cover = response.name;
      });
    });
  };

  removeCover = function (): void {
    this.deleteImage('cover', this.post.cover).subscribe(data => delete this.post.cover);
  };

  uploadContentImages = function (event): void {
    if (this.post.images && this.post.images.length > 0) {
      this.removeContentImages();
    } else {
      this.post.images = new Array<ContentImage>();
    }
    let files = event.target.files;
    let self = this;
    for (let i = 0; i < files.length; i++) {
      this.postImage('content', files[i]).subscribe(function (data) {
        self.post.images.push(data);
        self.resizeImage('content', data.name).subscribe(response => self.replaceImage(response, data));
      });
    }
  };

  removeContentImages = function (): void {
    this.post.images.forEach(element => {
      this.deleteImage('content', element.name).subscribe(data => this.post.images.splice(this.post.images.indexOf(element)));
    });
  };

  postImage = function (imageType: string, file: File): Observable<any> {
    let formData = new FormData();
    formData.append('image', file);
    return this.http.post(this.imagesURL + imageType, formData);
  };

  deleteImage = function (fieldname: string, filename: string): Observable<any> {
    return this.http.delete((this.imagesURL + fieldname + '/' + filename));
  };

  uploadPost = function (): void {
    this.post.timestamp = new Date();
    let URL = 'api/posts';
    this.http.post(URL, this.post).subscribe(
      data => { this.submitted = true; this.success = true; },
      error => { this.submitted = true; this.error = error; }
    );
    this.countdownNavigate();
  };

  countdownNavigate = function (): void {
    this.remaining = 9;
    let redirect = window.setInterval(() => {
      this.remaining--;
      if (this.remaining <= 0) {
        window.clearInterval(redirect);
        this.router.navigate(['/work']);
      }
    }, 100);
  };

  resizeImage = function (imageType, filename): Observable<ContentImage> {
    return this.http.patch(this.imagesURL + imageType + '/' + filename);
  };

  replaceImage = function (newImage: ContentImage, oldImage: ContentImage): void {
    this.post.images.splice(this.post.images.indexOf(oldImage), 1, newImage);
    this.deleteImage('content', oldImage.name).subscribe();
  };
}
