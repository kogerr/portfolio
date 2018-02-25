import { Component } from '@angular/core';
import { Post } from './post';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent {
  post = new Post();
 }
