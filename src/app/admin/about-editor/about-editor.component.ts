import { Component, OnInit } from '@angular/core';
import { DataService as CommonDataService } from '../../data.service';
import { About, IndexedText, HeaderAndLines, PossiblyClickable } from '../../models/about.interface';

@Component({
  selector: 'app-about-editor',
  templateUrl: './about-editor.component.html',
  styleUrls: ['./about-editor.component.css']
})
export class AboutEditorComponent implements OnInit {
  content: About;
  indexedTextType = IndexedText;
  possiblyClickableType = PossiblyClickable;
  headerAndLinesType = HeaderAndLines;

  constructor(private commonDataService: CommonDataService) { }

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.commonDataService.getAbout().subscribe(data => this.content = data);
  }

  updateIfSuccess = data => { if (data.success) { this.update(); } };

}
