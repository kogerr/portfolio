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
        const initial = this.position;
        const step = (newPosition - initial) / 100;

        const i = setInterval(() => {
            this.position += step;
            if (this.position === newPosition) {
                clearInterval(i);
            }
        }, 10);
    }

    shiftBy(difference: number): DisplayedSlide {
        this.position += difference;
        return this;
    }

}
