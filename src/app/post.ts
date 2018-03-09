export class Post {
    id: number;
    title: string;
    titleURL: string;
    client: string;
    text: string;
    cover: string;
    images: Array<ContentImage>;
    timestamp: Date;
}

export class ContentImage {
    name: string;
    width: string;
}
