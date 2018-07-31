import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Post, ContentImage, ContentType, TextContent } from '../../models/post';
import { AdminDataService } from '../data.service';
import { DataService as CommonDataService } from '../../data.service';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent implements OnDestroy, OnInit {
  constructor(private dataService: AdminDataService, private commonDataService: CommonDataService,
    private router: Router, private route: ActivatedRoute) { }
  post: Post;
  submitted = false;
  existingPost: boolean;
  originalTitleURL: string;
  error = false;
  remaining: number;
  openTextElement = false;
  textUnderEdition: string;

  ngOnInit(): void {

    this.route.params.subscribe(p => {
      if (p.titleURL) {
        this.commonDataService.getPost(p.titleURL).subscribe(data => {
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
    if (!this.submitted && !this.existingPost && this.post.cover) {
      this.removeImage('cover');
    }
    if (!this.submitted && !this.existingPost && this.post.contents && this.post.contents.length > 0) {
      this.removeContentImages((this.post.contents.filter(e => e.type === ContentType.image) as ContentImage[]));
    }
  }

  uploadImage(event: HTMLInputEvent, field: string): void {
    if (this.post[field]) {
      this.removeImage(field);
    }
    this.dataService.postImage(event.target.files[0]).subscribe(data => {
      this.post[field] = data.name;
    });
  }

  removeImage(image: string): void {
    this.dataService.deleteImage(this.post[image]).subscribe(
      () => delete this.post[image],
      err => { delete this.post[image]; this.error = err; });
  }

  uploadContentImages(event: HTMLInputEvent): void {
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.dataService.postImage(files[i]).subscribe(data => {
        let image = { name: data.name, type: ContentType.image, width: 100 };
        this.post.contents.push(image);
      });
    }
  }

  removeContentImages(images: Array<ContentImage>): void {
    images.forEach(element => {
      this.dataService.deleteImage(element.name).subscribe(() => {
        this.post.contents.splice(this.post.contents.indexOf(element), 1);
      });
    });
  }

  uploadPost(): void {
    this.post.timestamp = new Date();
    if (this.post.intro && this.post.intro.length > 0) {
      this.post.intro = this.post.intro.replace(/\n/g, '<br/>');
    }
    if (!this.post.previewImage) {
      this.post.previewImage = this.post.cover;
    }
    this.dataService.uploadPost(this.post).subscribe(
      data => { this.submitted = data.success; this.countdownNavigate(20); },
      error => { this.submitted = true; this.error = error; this.countdownNavigate(50); }
    );
  }

  updatePost(): void {
    if (!this.post.previewImage) {
      this.post.previewImage = this.post.cover;
    }
    this.dataService.updatePost(this.post, this.originalTitleURL).subscribe(
      data => { this.submitted = data.success; this.countdownNavigate(20); },
      error => { this.submitted = true; this.error = error; this.countdownNavigate(50); }
    );
  }

  countdownNavigate(milliseconds: number): void {
    this.remaining = milliseconds;
    let redirect = window.setInterval(() => {
      this.remaining--;
      if (this.remaining <= 0) {
        window.clearInterval(redirect);
        this.router.navigate(['/admin/postlist']);
      }
    }, 100);
  }

  replaceImage(newImage: ContentImage, oldImage: ContentImage): void {
    newImage.width = 50;
    this.post.contents.splice(this.post.contents.indexOf(oldImage), 1, newImage);
    this.dataService.deleteImage(oldImage.name).subscribe();
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

  openTextEditor(): void {
    this.openTextElement = true;
  }

  saveTextElement(): void {
    let text = this.textUnderEdition.replace(/\n/g, '<br/>');
    let textElement = { text, type: ContentType.text };
    this.post.contents.push(textElement);
    this.openTextElement = false;
    this.textUnderEdition = '';
  }

  removeElement(index: number): void {
    if (this.post.contents[index].type === ContentType.image) {
      let name = (this.post.contents[index] as ContentImage).name;
      this.dataService.deleteImage(name).subscribe(() => { });
    }
    this.post.contents.splice(index, 1);
  }

  moveElementUp(index: number): void {
    if (index > 0) {
      let previous = this.post.contents[index - 1];
      this.post.contents[index - 1] = this.post.contents[index];
      this.post.contents[index] = previous;
    }
  }

  moveElementDown(index: number): void {
    if (index < this.post.contents.length - 1) {
      let next = this.post.contents[index + 1];
      this.post.contents[index + 1] = this.post.contents[index];
      this.post.contents[index] = next;
    }
  }

  editElement(index: number): void {
    this.textUnderEdition = (this.post.contents[index] as TextContent).text.replace(/<br\/>/g, '\n');
    this.openTextEditor();
    this.removeElement(index);
  }
}
