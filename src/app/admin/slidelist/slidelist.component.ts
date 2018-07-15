import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../data.service';
import { DataService as CommonDataService } from '../../data.service';
import { Slide } from '../../models/slide';
import { Post } from '../../models/post';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-slidelist',
  templateUrl: './slidelist.component.html',
  styleUrls: ['./slidelist.component.css']
})
export class SlidelistComponent implements OnInit {

  constructor(private dataService: AdminDataService, private commonDataService: CommonDataService) { }

  slides: Slide[];
  posts: Post[];

  ngOnInit(): void {
    this.commonDataService.loadSlides().subscribe((data) => { this.slides = data; });
    this.commonDataService.loadPosts().subscribe((data) => { this.posts = data; });
  }

  changeLink(index: number): void {
    this.slides[index].link = this.posts.find(e => e.title === this.slides[index].title).titleURL;
    let slide = this.slides[index];
    this.updateSlideByImageURL(slide.imageURL, { title: slide.title, link: slide.link });
  }

  newSlide(event: HTMLInputEvent): void {
    this.dataService.postImage(event.target.files[0]).subscribe(data => {
      this.dataService.newSlide(data.name).subscribe(newSlide => {
        this.slides.push(newSlide);
      });
    });
  }

  removeSlide(index: number): void {
    let imageURL = this.slides[index].imageURL;
    this.dataService.deleteSlide(imageURL).subscribe(() => {
      this.dataService.deleteImage(imageURL).subscribe(() => {
        this.slides.splice(index, 1);
        this.shiftIndices(index);
      });
    });
  }

  moveSlideUp(index: number): void {
    if (index > 0) {
      let previous = this.slides[index - 1];
      this.slides[index - 1] = this.slides[index];
      this.slides[index] = previous;
      this.slides[index].index++;
      this.slides[index - 1].index--;
      this.updateIndex([index, index - 1]);
    }
  }

  moveSlideDown(index: number): void {
    if (index < this.slides.length - 1) {
      let next = this.slides[index + 1];
      this.slides[index + 1] = this.slides[index];
      this.slides[index] = next;
      this.slides[index].index--;
      this.slides[index + 1].index++;
      this.updateIndex([index, index + 1]);
    }
  }

  openInNewTab(url: string): void {
    let win = window.open(url, '_blank');
    win.focus();
  }

  updateIndex(index: number[]): void {
    let indexPairs = new Array<{ index: number, imageURL: string }>();
    index.forEach(i => {
      indexPairs.push({ index: this.slides[i].index, imageURL: this.slides[i].imageURL });
    });
    this.dataService.updateSlideIndices(indexPairs).subscribe(() => { });
  }

  shiftIndices(from: number): void {
    if (from < this.slides.length) {
      let indexPairs = new Array<{ index: number, imageURL: string }>();
      for (let i = from; i < this.slides.length; i++) {
        this.slides[i].index--;
        indexPairs.push({ index: this.slides[i].index, imageURL: this.slides[i].imageURL });
      }
      this.dataService.updateSlideIndices(indexPairs).subscribe(() => { });
    }
  }

  updateSlideByImageURL(imageURL: string, update: any): void {
    this.dataService.updateSlide(imageURL, update).subscribe(() => { });
  }

}
