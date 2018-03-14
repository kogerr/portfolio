export class Post {
    title: string;
    titleURL: string;
    client: string;
    text: string;
    cover: string;
    images: Array<ContentImage>;
    timestamp: Date;

    constructor() {
        this.images = new Array<ContentImage>();
    }
}

export class ContentImage {
    name: string;
    width: string;
}
