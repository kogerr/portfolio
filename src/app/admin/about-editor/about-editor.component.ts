import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../data.service';
import { DataService as CommonDataService } from '../../data.service';
import { About } from '../../models/about.interface';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-about-editor',
  templateUrl: './about-editor.component.html',
  styleUrls: ['./about-editor.component.css']
})
export class AboutEditorComponent implements OnInit {
  content: About;

  constructor(private dataService: AdminDataService, private commonDataService: CommonDataService) { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.commonDataService.getAbout().subscribe(data => this.content = data);
  }

  updateIfSuccess = data => { if (data.success) { this.update(); } };

  swapImages(): void {
    [this.content.images[0], this.content.images[1]] = [this.content.images[1], this.content.images[0]];
    this.dataService.updateAbout({ images: this.content.images }).subscribe(this.updateIfSuccess);
  }

  deleteImage(imageNumber: number): void {
    this.content.images.splice(imageNumber, 1);
    this.dataService.updateAbout({ images: this.content.images }).subscribe(this.updateIfSuccess);
  }

  uploadImage(event: HTMLInputEvent): void {
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.dataService.postImage(files[i]).subscribe(data => {
        this.content.images.push(data.name);
        this.dataService.updateAbout({ images: this.content.images }).subscribe(this.updateIfSuccess);
      });
    }
  }

  saveIntro(text: string): void {
    let cleanedText = text.replace(/<div><br><\/div>/g, '<br>').replace(/<div>/g, '<br>').replace(/<\/div>/g, '');
    this.dataService.updateAbout({ intro: cleanedText }).subscribe(this.updateIfSuccess);
  }

}
