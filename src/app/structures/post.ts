export class Post {
    title: string;
    titleURL: string;
    type: string;
    link: string;
    year: number;
    client: string;
    intro: string;
    cover: string;
    images: Array<ContentImage>;
    timestamp: Date;

    constructor() {
        this.images = new Array();
    }
}

export interface ContentImage {
    name: string;
    width: number;
}

export interface TextContent {
    text: string;
}
