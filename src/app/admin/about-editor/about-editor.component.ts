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

  updateIfSuccess = data => { if (data.success) { this.update(); } };

  saveIntro(text: string): void {
    let cleanedText = text.replace(/<div><br><\/div>/g, '<br>').replace(/<div>/g, '<br>').replace(/<\/div>/g, '');
    this.dataService.updateAbout({ intro: cleanedText }).subscribe(this.updateIfSuccess);
  }

}
