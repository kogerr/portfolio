import { Component, Input, EventEmitter, Output } from '@angular/core';
import { AdminDataService } from '../../data.service';
import { PossiblyClickable, HeaderAndLines, IndexedText } from '../../../models/about.interface';

@Component({
  selector: 'editor-section',
  templateUrl: './editor-section.component.html',
  styleUrls: ['./editor-section.component.css']
})
export class EditorSectionComponent<T extends IndexedText | PossiblyClickable | HeaderAndLines> {
  @Input() field: string;
  @Input() content: Array<T>;
  @Output() update = new EventEmitter<boolean>();
  @Input() type: new (o: T) => T;

  constructor(private dataService: AdminDataService) { }

  properties(o: any): Array<string> {
    return Object.keys(o).filter(e => e !== 'index' && e !== 'edit');
  }

  isArray = (o) => Array.isArray(o);

  updateIfSuccess = data => { if (data.success) { this.update.emit(); } };

  resetIndices(): void {
    let i = 0;
    this.content.forEach(e => e.index = i++);
    this.updateElements();
  }

  removeElement(value: any): void {
    this.content.splice(this.content.indexOf(value), 1);
    this.resetIndices();
  }

  swapElements(first: number, second: number): void {
    if (this.content[first] && this.content[second]) {
      let previousIndex = this.content[first].index;
      this.content[first].index = this.content[second].index;
      this.content[second].index = previousIndex;
      this.content = this.content.sort((a, b) => a.index - b.index);
      this.updateElements();
    }
  }

  updateElements(): void {
    this.content.forEach(this.removeEdit);
    this.removeEmptyElements();
    this.dataService.updateAbout({ [this.field]: this.content }).subscribe(this.updateIfSuccess);
  }

  addElement(value: { text: string }): void {
    let index: number = this.content.length;
    let update = Object.assign({ index }, value);
    this.dataService.addAboutElement({ [this.field]: update }).subscribe(this.updateIfSuccess);
  }

  newElement(): IndexedText | PossiblyClickable | HeaderAndLines {
    let newElement = new this.type({ index: this.content.length } as T);
    newElement.index = this.content.length;
    // tslint:disable-next-line:no-string-literal
    newElement['edit'] = true;
    return newElement;
  }

  removeEdit = e => delete e.edit;

  removeEmptyElements(): void {
    this.content.forEach(e => this.properties(e).filter(p => this.isArray(e[p])).forEach(p => {
      e[p] = e[p].filter(x => x !== '');
    })
    );
  }
}
