import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, ContentImage } from '../models/post';
import { Slide } from '../models/slide';
import { About } from '../models/about.interface';
import { LoginResponse } from '../models/login-response';

const postsURL = 'api/posts/';
const imagesURL = 'api/images/';
const slidesURL = 'api/slides/';
const aboutURL = 'api/about/';
const loginURL = 'api/login/';
const logURL = 'api/log/';

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

    uploadPost(post: Post): Observable<{ success: boolean }> {
        return this.http.post<{ success: boolean }>(postsURL, post);
    }

    updatePost(post: Post, titleURL: string): Observable<{ success: boolean }> {
        return this.http.patch<{ success: boolean }>(postsURL + titleURL, post);
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

    deleteImage(filename: string): Observable<{ success: boolean }> {
        return this.http.delete<{ success: boolean }>(imagesURL + filename);
    }

    resizeImage(filename: string, proportions: { w: number, h: number }): Observable<ContentImage> {
        return this.http.patch<ContentImage>(imagesURL + filename, proportions);
    }

    updateAbout(aboutContent: About): Observable<{ success: boolean }> {
        return this.http.post<{ success: boolean }>(aboutURL, aboutContent);
    }

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(loginURL, { email, password });
    }

    getLogs(): Observable<Array<any>> {
        return this.http.get<Array<any>>(logURL);
    }
}
