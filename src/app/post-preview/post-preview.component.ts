import { Component, Input } from '@angular/core';
import { Post } from '../post';

@Component({
  selector: 'post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.css']
})

export class PostPreviewComponent {
    @Input()
    post: Post;
}
