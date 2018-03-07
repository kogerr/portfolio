import { ContentImage } from './content-image';

export class Post {
    id: number;
    title: string;
    client: string;
    text: string;
    cover: string;
    images: Array<ContentImage>;
    timestamp: Date;
}
