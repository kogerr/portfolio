import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Post, ContentImage } from './post';
import { DataService } from './data.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnDestroy {
  constructor(private dataService: DataService, private router: Router) { }
  post = new Post();
  submitted = false;

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
    this.dataService.postImage('cover', event.target.files[0]).subscribe(function (data) {
      self.dataService.resizeImage('cover', data.name).subscribe(function (response) {
        self.post.cover = response.name;
      });
    });
  };

  removeCover = function (): void {
    this.dataService.deleteImage('cover', this.post.cover).subscribe(data => delete this.post.cover);
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
      this.dataService.postImage('content', files[i]).subscribe(function (data) {
        self.post.images.push(data);
        self.dataService.resizeImage('content', data.name).subscribe(response => self.replaceImage(response, data));
      });
    }
  };

  removeContentImages = function (): void {
    this.post.images.forEach(element => {
      this.dataService.deleteImage('content', element.name).subscribe(data => this.post.images.splice(this.post.images.indexOf(element)));
    });
  };

  uploadPost = function (): void {
    this.post.timestamp = new Date();
    this.dataService.uploadPost(this.post).subscribe(
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

  replaceImage = function (newImage: ContentImage, oldImage: ContentImage): void {
    this.post.images.splice(this.post.images.indexOf(oldImage), 1, newImage);
    this.dataService.deleteImage('content', oldImage.name).subscribe();
  };

  generateTitleURL = function (): void {
    let titleURL = this.post.title.toLowerCase();
    let vowels = {
      accented: ['é', 'á', 'ű', 'ő', 'ú', 'ö', 'ü', 'ó', 'í'],
      normal: ['e', 'a', 'u', 'o', 'u', 'o', 'u', 'o', 'i']
    };
    for (let i = 0; i < vowels.accented.length; i++) {
      titleURL = titleURL.replace(new RegExp(vowels.accented[i], 'g'), vowels.normal[i]);
    }
    this.post.titleURL = titleURL.split(' ').map(t => t.replace(/[^\x00-\x7F]/g, '')).filter(t => t).join('-');
  };
}
