import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post, ContentImage } from './structures/post';
import { Slide } from './carousel-slide/slide';
import { About } from './structures/about.interface';

const postsURL = 'api/posts/';
const imagesURL = 'api/images/';
const slidesURL = 'api/slides/';
const aboutURL = 'api/about/';
const loginURL = 'api/login/';

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

    uploadPost(post: Post, token: string): Observable<{ success: boolean }> {
        let httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer' + token }) };
        return this.http.post<{ success: boolean }>(postsURL, post, httpOptions);
    }

    updatePost(post: Post, titleURL: string, token: string): Observable<{ success: boolean }> {
        let httpOptions = { headers: new HttpHeaders({ 'Authorization': 'Bearer' + token }) };
        return this.http.patch<{ success: boolean }>(postsURL + titleURL, post);
    }

    getPreviousPostTitleUrl(titleURL: string): Observable<{ titleURL: string }> {
        return this.http.get<{ titleURL: string }>(postsURL + titleURL + '/previous');
    }

    getNextPostTitleUrl(titleURL: string): Observable<{ titleURL: string }> {
        return this.http.get<{ titleURL: string }>(postsURL + titleURL + '/next');
    }

    postImage(imageType: string, file: File): Observable<any> {
        let formData = new FormData();
        formData.append('image', file);
        return this.http.post(imagesURL + imageType, formData);
    }

    deleteImage(fieldname: string, filename: string): Observable<{ success: boolean }> {
        return this.http.delete<{ success: boolean }>(imagesURL + fieldname + '/' + filename);
    }

    resizeImage(imageType, filename, proportions): Observable<ContentImage> {
        return this.http.patch<ContentImage>(imagesURL + imageType + '/' + filename, proportions);
    }

    loadSlides(): Observable<Slide[]> {
        return this.http.get<Slide[]>(slidesURL);
    }

    getAbout(): Observable<About> {
        return this.http.get<About>(aboutURL);
    }

    updateAbout(aboutContent: About): Observable<{ success: boolean }> {
        return this.http.post<{ success: boolean }>(aboutURL, aboutContent);
    }

    login(email: string, password: string): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(loginURL, { email, password });
    }
}
