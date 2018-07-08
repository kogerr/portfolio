export default interface Post {
    title: string;
    titleURL: string;
    type: string;
    link: string;
    year: number;
    client: string;
    intro: string;
    cover: string;
    contents: Array<ContentElement>;
    facebookDescription: string;
    facebookImage: string;
    timestamp: Date;
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
