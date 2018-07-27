import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../data.service';
import { DataService as CommonDataService } from '../../data.service';
import { About } from '../../models/about.interface';

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

  test(sg: any): void {
    console.log(sg, typeof sg);
  }

  saveIntro(text: string): void {
    let cleanedText = text.replace(/<div><br><\/div>/g, '<br>').replace(/<div>/g, '<br>').replace(/<\/div>/g, '');
    this.dataService.updateAbout({ intro: cleanedText }).subscribe(data => {
      if (data.success) {
        this.update();
      }
    });
  }

  removeElement(field: string, value: string): void {
    this.dataService.removeAboutElement({ [field]: value }).subscribe(data => {
      if (data.success) {
        this.update();
      }
    });
  }

  swapElements(field: string, first: number, second: number): void {
    if (this.content[field][first] && this.content[field][second]) {
      let previousIndex = this.content[field][first].index;
      this.content[field][first].index = this.content[field][second].index;
      this.content[field][second].index = previousIndex;
      this.dataService.updateAbout({ [field]: this.content[field] }).subscribe(data => {
        if (data.success) {
          this.update();
        }
      });
    }
  }
}
