import { CircularList } from './CircularList';
import { Slide } from '../models/slide';
import { DisplayedSlide } from './DisplayedSlide';

export class CarouselDisplay {
    private list: CircularList<Slide>;
    public values: Array<DisplayedSlide>;
    public locked = false;

    constructor(data: Array<Slide>, private lockTime: number) {
        this.list = new CircularList<Slide>(data);
        this.values = CarouselDisplay.initValues(this.list);
    }

    private static initValues(list: CircularList<Slide>): Array<DisplayedSlide> {
        let i = -200;
        return [list.previous(), list.current(), list.next()]
            .map(s => new DisplayedSlide(s, i += 100));
    }

    public next(): void {
        if (!this.locked) {
            this.locked = true;
            this.values.splice(0, 1);
            this.values.forEach(e => e.shiftBy(-100));
            let newSlide = new DisplayedSlide(this.list.stepForward(), 100);
            this.values.push(newSlide);
            setTimeout(() => { this.locked = false; }, this.lockTime);
        }
    }

    public previous(): void {
        if (!this.locked) {
            this.locked = true;
            this.values.splice(this.values.length - 1, 1);
            this.values.forEach(e => e.shiftBy(100));
            let newSlide = new DisplayedSlide(this.list.stepBack(), -100);
            this.values.push(newSlide);
            setTimeout(() => { this.locked = false; }, this.lockTime);
        }
    }

}
