import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, ContentImage } from '../models/post';
import { Slide } from '../models/slide';
import { About } from '../models/about.interface';
import { LoginResponse } from '../models/login-response';

const postsURL = 'api/posts/';
const indicesURL = 'api/posts/indices';
const imagesURL = 'api/images/';
const slidesURL = 'api/slides/';
const aboutURL = 'api/about/';
const loginURL = 'api/login/';
const logURL = 'api/log/';

interface SuccessFlag {
    success: boolean;
}

@Injectable()
export class AdminDataService {
    constructor(private http: HttpClient) { }

    /**
     * Returns a boolean wether a post by the given title URL already exists.
     *
     * @param titleURL title URL
     * @returns found:true if the post exists
     */
    checkPost(titleURL: string): Observable<{ found: boolean }> {
        return this.http.get<{ found: boolean }>(postsURL + titleURL + '/check');
    }

    uploadPost(post: Post): Observable<SuccessFlag> {
        return this.http.put<SuccessFlag>(postsURL, post);
    }

    updatePost(post: Post, titleURL: string): Observable<SuccessFlag> {
        return this.http.patch<SuccessFlag>(postsURL + titleURL, post);
    }

    /**
     * Uploads a file to the images directory.
     *
     * @param file image file to upload
     * @returns the name of the uploaded file
     */
    postImage(file: File): Observable<{ name: string }> {
        let formData = new FormData();
        formData.append('image', file);
        return this.http.post<{ name: string }>(imagesURL, formData);
    }

    deleteImage(filename: string): Observable<SuccessFlag> {
        return this.http.delete<SuccessFlag>(imagesURL + filename);
    }

    resizeImage(filename: string, proportions: { w: number, h: number }): Observable<ContentImage> {
        return this.http.patch<ContentImage>(imagesURL + filename, proportions);
    }

    updateAbout(aboutContent: About): Observable<SuccessFlag> {
        return this.http.post<SuccessFlag>(aboutURL, aboutContent);
    }

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(loginURL, { email, password });
    }

    getLogs(): Observable<Array<any>> {
        return this.http.get<Array<any>>(logURL);
    }

    updateIndices(indexPairs: { index: number, titleURL: string }[]): Observable<SuccessFlag> {
        return this.http.post<SuccessFlag>(indicesURL, indexPairs);
    }

    deletePost(titleURL: string): Observable<SuccessFlag> {
        return this.http.delete<SuccessFlag>(postsURL + titleURL);
    }
}
