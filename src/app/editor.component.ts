import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})

export class EditorComponent {
  constructor(private http: HttpClient) {}
  post = new Post();
  postAsJson = function(): string {
    return JSON.stringify(this.post);
  };

  test = function(event): void {
    if (event.target.files[0].loaded) {
      console.log(new Date());
    } else {
      let URL = 'api/images';
      let file = event.target.files[0];
      console.log(file);
      this.http.post(URL, file).subscribe(data => console.log(data));
      /*file.on('load', function () {
        selfHttp.post(URL, file).subscribe(data => console.log(data));
      });*/
      /*
      reader.readAsDataURL(event.target.files[0]);
      let reader = new FileReader();
      reader.addEventListener('load', function () {
        console.log(reader.result);
        // selfHttp.post(URL, reader.result).subscribe(data => console.log(data));
        selfHttp.post(URL, event.target.files[0]).subscribe(data => console.log(data));
      });*/
    }
  };
 }
