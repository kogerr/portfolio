export class CircularList<T> {
    constructor(collection?: Array<T>) {
        this.items = collection || new Array<T>();
    }

    items: Array<T>;
    index = -1;

    next(): T {
        if (this.index + 1 < this.items.length) {
            this.index++;
        } else {
            this.index = 0;
        }
        return this.items[this.index];
    }

    previous(): T {
        if (this.index > 0) {
            this.index--;
        } else {
            this.index = this.items.length - 1;
        }
        return this.items[this.index];
    }
}
