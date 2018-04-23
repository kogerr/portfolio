export class CircularList<T> {
    constructor(collection?: Array<T>) {
        if (collection) {
            this.items = collection;
        } else {
            this.items = new Array<T>();
        }
    }

    items: Array<T>;
    index = 0;

    next = function (): T {
        if (this.index + 1 < this.items.length) {
            return this.items[this.index++];
        } else {
            let tempIndex = this.index;
            this.index = 0;
            return this.items[tempIndex];
        }
    };

    previous = function (): T {
        if (this.index > 0) {
            return this.items[this.index--];
        } else {
            this.index = this.items.length - 1;
            return this.items[0];
        }
    };

    put = function (element: T): void {
        this.items.put(element);
    };
}
