import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  fullHeader = true;

  scrollUp = function () {
    window.scrollTo(0, 0);
  };
}
