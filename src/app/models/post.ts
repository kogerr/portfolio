export class Post {
    title: string;
    titleURL: string;
    type: string;
    link: string;
    year: number;
    client: string;
    intro: string;
    cover: string;
    contents: Array<ContentElement>;
    timestamp: Date;

    constructor() {
        this.contents = new Array<ContentElement>();
    }
}

export interface ContentElement {
    type: ContentType;
    width?: number;
}

export enum ContentType {
    text = 'text',
    image = 'image',
    video = 'video'
}

export interface TextContent extends ContentElement {
    text: string;
}

export interface ContentImage extends ContentElement {
    name: string;
    width: number;
}