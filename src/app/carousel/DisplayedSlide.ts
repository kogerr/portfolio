import { Slide } from '../models/slide';

export class DisplayedSlide {
    constructor(slide: Slide, position: number) {
        this.position = position;
        this.title = slide.title;
        this.imageURL = slide.imageURL;
        this.link = slide.link;
    }

    position: number;
    title: string;
    imageURL: string;
    link: string;

    moveTo(newPosition: number): void {
        let initial = this.position;
        let step = (newPosition - initial) / 100;

        let i = setInterval(() => {
            this.position += step;
            if (this.position === newPosition) {
                clearInterval(i);
            }
        }, 10);
    }

}
