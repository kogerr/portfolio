export class CircularList<T> {
    constructor(collection: Array<T>) {
        this.index = CircularList.arrayToLinkedList<T>(collection);
    }

    index: Node<T>;

    private static arrayToLinkedList<S>(array: Array<S>): Node<S> {
        let first = {value: array[0], next: null, previous: null};
        let current = first;
        for (let i = 1; i < array.length; i++) {
            let newNode = {value: array[i], next: null, previous: current};
            current.next = newNode;
            current = newNode;
        }
        current.next = first;
        first.previous = current;
        return first;
    }

    current(): T {
        return this.index.value;
    }

    next(): T {
        return this.index.next.value;
    }

    previous(): T {
        return this.index.previous.value;
    }

    stepForward(): T {
        this.index = this.index.next;
        return this.index.next.value;
    }

    stepBack(): T {
        this.index = this.index.previous;
        return this.index.previous.value;
    }
}

interface Node<T> {
    value: T;
    next: Node<T>;
    previous: Node<T>;
}
