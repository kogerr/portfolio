import { Component, OnInit } from '@angular/core';
import { AdminDataService } from '../data.service';
import { DataService as CommonDataService } from '../../data.service';
import { About, IndexedText } from '../../models/about.interface';

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

  updateIfSuccess = data => { if (data.success) { this.update(); } };

  saveIntro(text: string): void {
    let cleanedText = text.replace(/<div><br><\/div>/g, '<br>').replace(/<div>/g, '<br>').replace(/<\/div>/g, '');
    this.dataService.updateAbout({ intro: cleanedText }).subscribe(this.updateIfSuccess);
  }

  removeElement(field: string, value: IndexedText): void {
    this.dataService.removeAboutElement({ [field]: value }).subscribe(this.updateIfSuccess);
  }

  swapElements(field: string, first: number, second: number): void {
    if (this.content[field][first] && this.content[field][second]) {
      let previousIndex = this.content[field][first].index;
      this.content[field][first].index = this.content[field][second].index;
      this.content[field][second].index = previousIndex;
      this.dataService.updateAbout({ [field]: this.content[field] }).subscribe(this.updateIfSuccess);
    }
  }

  updateElement(field: string): void {
    this.dataService.updateAbout({ [field]: this.content[field] }).subscribe(this.updateIfSuccess);
  }

  addElement(field: string, value: {text: string}): void {
    let index: number = this.content[field].length;
    let update = Object.assign({index}, value);
    this.dataService.addAboutElement({[field]: update}).subscribe(this.updateIfSuccess);
  }

  removeEdit(element: {edit: boolean}): void {
    delete element.edit;
  }
}
