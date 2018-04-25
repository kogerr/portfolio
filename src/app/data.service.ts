import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post, ContentImage } from './post';
import { Slide } from './carousel-slide/slide';

const postsURL = 'api/posts/';
const imagesURL = 'api/images/';
const slidesURL = 'api/slides/';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    loadPosts = function(): Observable<Post[]> {
        return this.http.get(postsURL);
    };

    getPost = function (titleURL: string): Observable<Post> {
        return this.http.get(postsURL + titleURL);
    };

    checkPost = function (titleURL: string): Observable<{ found: boolean }> {
        return this.http.get(postsURL + titleURL + '/check');
    };

    postImage = function (imageType: string, file: File): Observable<any> {
        let formData = new FormData();
        formData.append('image', file);
        return this.http.post(imagesURL + imageType, formData);
    };

    deleteImage = function (fieldname: string, filename: string): Observable<any> {
        return this.http.delete((imagesURL + fieldname + '/' + filename));
    };

    uploadPost = function (post: Post): Observable<any> {
        return this.http.post(postsURL, post);
    };

    updatePost = function (post: Post, titleURL: string): Observable<any> {
        return this.http.patch(postsURL + titleURL, post);
    };

    resizeImage = function (imageType, filename, proportions): Observable<ContentImage> {
        return this.http.patch(imagesURL + imageType + '/' + filename, proportions);
    };

    loadSlides = function(): Observable<Slide[]> {
        return this.http.get(slidesURL);
    };
}