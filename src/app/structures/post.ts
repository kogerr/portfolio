export class Post {
    title: string;
    titleURL: string;
    type: string;
    link: string;
    year: number;
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
