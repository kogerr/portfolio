export class CircularList {
    constructor(collection) {
        this.index = -1;
        this.next = function () {
            if (this.index + 1 < this.items.length) {
                this.index++;
            }
            else {
                this.index = 0;
            }
            return this.items[this.index];
        };
        this.previous = function () {
            if (this.index > 0) {
                this.index--;
            }
            else {
                this.index = this.items.length - 1;
            }
            return this.items[this.index];
        };
        this.put = function (element) {
            this.items.put(element);
        };
        this.items = collection || new Array();
    }
}
