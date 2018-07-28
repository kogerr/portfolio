import { Component, Input } from '@angular/core';

@Component({
  selector: 'add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.css']
})
export class AddElementComponent {
  @Input() elementType: string;
}
