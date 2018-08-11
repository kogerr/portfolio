import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AdminDataService } from '../../data.service';

@Component({
  selector: 'editor-section',
  templateUrl: './editor-section.component.html',
  styleUrls: ['./editor-section.component.css']
})
export class EditorSectionComponent<T extends { index: number, edit?: boolean }> {
  @Input() field: string;
  @Input() content: Array<T>;
  @Output() update = new EventEmitter<boolean>();

  constructor(private dataService: AdminDataService) { }

  properties(o: any): Array<string> {
    return Object.keys(o).filter(e => e !== 'index' && e !== 'edit');
  }

  isArray = (o) => Array.isArray(o);

  updateIfSuccess = data => { if (data.success) { this.update.emit(); } };

  removeElement(value: any): void {
    this.dataService.removeAboutElement({ [this.field]: value }).subscribe(this.updateIfSuccess);
  }

  swapElements(first: number, second: number): void {
    if (this.content[first] && this.content[second]) {
      let previousIndex = this.content[first].index;
      this.content[first].index = this.content[second].index;
      this.content[second].index = previousIndex;
      this.updateElements();
    }
  }

  updateElements(): void {
    this.content.forEach(this.removeEdit);
    this.dataService.updateAbout({ [this.field]: this.content }).subscribe(this.updateIfSuccess);
  }

  addElement(value: { text: string }): void {
    let index: number = this.content.length;
    let update = Object.assign({ index }, value);
    this.dataService.addAboutElement({ [this.field]: update }).subscribe(this.updateIfSuccess);
  }

  newElement(): T {
    let newElement = { index: this.content.length, edit: true };
    this.properties(this.content[0]).forEach(p => newElement[p] = '');
    return (newElement as T);
  }

  removeEdit = e => delete e.edit;
}
