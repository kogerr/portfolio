import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post, ContentImage } from '../post';
import { DataService } from '../data.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnDestroy, OnInit {
  constructor(private dataService: DataService, private router: Router, private route: ActivatedRoute) { }
  post: Post;
  submitted = false;
  existingPost: boolean;
  originalTitleURL: string;
  error = false;

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      if (p.titleURL) {
        this.dataService.getPost(p.titleURL).subscribe(data => {
          this.post = data;
          this.existingPost = true;
          this.originalTitleURL = data.titleURL;
        });
      } else {
        this.post = new Post();
        this.existingPost = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (!this.submitted && this.post.cover) {
      this.removeCover();
    }
    if (!this.submitted && this.post.images && this.post.images.length > 0) {
      this.removeContentImages(this.post.images);
    }
  }

  uploadCover(event): void {
    if (this.post.cover) {
      this.removeCover();
    }
    this.dataService.postImage('cover', event.target.files[0]).subscribe(data => {
      this.dataService.resizeImage('cover', data.name, { w: 3, h: 1 }).subscribe(response => {
        this.dataService.deleteImage('cover', this.post.cover).subscribe();
        this.post.cover = response.name;
      });
    });
  }

  removeCover(): void {
    this.dataService.deleteImage('cover', this.post.cover).subscribe(data => delete this.post.cover);
  }

  uploadContentImages(event): void {
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.dataService.postImage('content', files[i]).subscribe(data => {
        this.post.images.push(data);
        this.dataService.resizeImage('content', data.name, { w: 10, h: 7 }).subscribe(response => this.replaceImage(response, data));
      });
    }
  }

  removeContentImages(images: Array<ContentImage>): void {
    images.forEach(element => {
      this.dataService.deleteImage('content', element.name).subscribe(data => {
        this.post.images.splice(this.post.images.indexOf(element), 1);
      });
    });
  }

  uploadPost(): void {
    this.post.timestamp = new Date();
    this.dataService.uploadPost(this.post).subscribe(
      data => { this.submitted = true; },
      error => { this.submitted = true; this.error = error; }
    );
    this.countdownNavigate();
  }

  updatePost(): void {
    this.dataService.updatePost(this.post, this.originalTitleURL).subscribe(
      data => { this.submitted = true; },
      error => { this.submitted = true; this.error = error; }
    );
    this.countdownNavigate();
  }

  countdownNavigate(): void {
    let remaining = 20;
    let redirect = window.setInterval(() => {
      remaining--;
      if (remaining <= 0) {
        window.clearInterval(redirect);
        this.router.navigate(['/work']);
      }
    }, 100);
  }

  replaceImage(newImage: ContentImage, oldImage: ContentImage): void {
    newImage.width = 'half';
    this.post.images.splice(this.post.images.indexOf(oldImage), 1, newImage);
    this.dataService.deleteImage('content', oldImage.name).subscribe();
  }

  generateTitleURL(): void {
    let titleURL = this.post.title.toLowerCase();
    let vowels = {
      accented: ['é', 'á', 'ű', 'ő', 'ú', 'ö', 'ü', 'ó', 'í'],
      normal: ['e', 'a', 'u', 'o', 'u', 'o', 'u', 'o', 'i']
    };
    for (let i = 0; i < vowels.accented.length; i++) {
      titleURL = titleURL.replace(new RegExp(vowels.accented[i], 'g'), vowels.normal[i]);
    }
    this.post.titleURL = titleURL.split(' ').map(t => t.replace(/[^\x00-\x7F]/g, '')).filter(t => t).join('-');
  }
}