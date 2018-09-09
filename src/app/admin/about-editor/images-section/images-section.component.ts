import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AdminDataService } from '../../data.service';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'images-section',
  templateUrl: './images-section.component.html',
  styleUrls: ['./images-section.component.css']
})
export class ImagesSectionComponent {
  @Input() images: Array<string>;
  @Output() update = new EventEmitter<boolean>();

  constructor(private dataService: AdminDataService) { }

  updateIfSuccess = data => { if (data.success) { this.update.emit(); } };

  swapImages(): void {
    [this.images[0], this.images[1]] = [this.images[1], this.images[0]];
    this.dataService.updateAbout({ images: this.images }).subscribe(this.updateIfSuccess);
  }

  deleteImage(imageNumber: number): void {
    this.images.splice(imageNumber, 1);
    this.dataService.updateAbout({ images: this.images }).subscribe(this.updateIfSuccess);
  }

  uploadImage(event: HTMLInputEvent): void {
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      this.dataService.postImage(files[i]).subscribe(data => {
        this.images.push(data.name);
        this.dataService.updateAbout({ images: this.images }).subscribe(this.updateIfSuccess);
      });
    }
  }
}
