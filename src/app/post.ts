export class Post {
    id: number;
    title: string;
    client: string;
    text: string;
    cover: string;
    images: Array<{ name: string, width: string }>;
    timestamp: Date;
}
