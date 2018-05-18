import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, ContentImage } from './post';
import { Slide } from './carousel-slide/slide';

const postsURL = 'api/posts/';
const imagesURL = 'api/images/';
const slidesURL = 'api/slides/';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    loadPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(postsURL);
    }

    getPost(titleURL: string): Observable<Post> {
        return this.http.get<Post>(postsURL + titleURL);
    }

    checkPost(titleURL: string): Observable<{ found: boolean }> {
        return this.http.get<{ found: boolean }>(postsURL + titleURL + '/check');
    }

    uploadPost(post: Post): Observable<any> {
        return this.http.post(postsURL, post);
    }

    updatePost(post: Post, titleURL: string): Observable<any> {
        return this.http.patch(postsURL + titleURL, post);
    }

    getPreviousPostTitleUrl(titleURL: string): Observable<string> {
        return this.http.get<string>(postsURL + titleURL + '/previous');
    }

    getNextPostTitleUrl(titleURL: string): Observable<{titleURL: string}> {
        return this.http.get<{titleURL: string}>(postsURL + titleURL + '/next');
    }

    postImage(imageType: string, file: File): Observable<any> {
        let formData = new FormData();
        formData.append('image', file);
        return this.http.post(imagesURL + imageType, formData);
    }

    deleteImage(fieldname: string, filename: string): Observable<any> {
        return this.http.delete((imagesURL + fieldname + '/' + filename));
    }

    resizeImage(imageType, filename, proportions): Observable<ContentImage> {
        return this.http.patch<ContentImage>(imagesURL + imageType + '/' + filename, proportions);
    }

    loadSlides(): Observable<Slide[]> {
        return this.http.get<Slide[]>(slidesURL);
    }
}
