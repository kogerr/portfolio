import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent {
  constructor(private http: HttpClient) { }
  post = new Post();
  postAsJson = function(): string {
    return JSON.stringify(this.post);
  };

  test = function(event): void {
    let URL = 'api/images';
    let file = event.target.files[0];
    let formData = new FormData();
    formData.append('cover-image', file, file.name);
    this.http.post(URL, formData).subscribe(data => this.post.cover = data.name);
  };
}
