import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './models/post';
import { Slide } from './models/slide';
import { About } from './models/about.interface';
import { Contact } from './models/contact';
import { map } from 'rxjs/operators';

const postsURL = 'api/posts/';
const slidesURL = 'api/slides/';
const aboutURL = 'api/about/';
const contactURL = 'api/contact/';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    /**
     * Loads all the posts.
     *
     * @returns an array of the posts
     */
    loadPosts(): Observable<Post[]> {
        return this.http.get<Post[]>(postsURL);
    }

    /**
     * Gets one post by the titleURL.
     *
     * @param titleURL title URL
     */
    getPost(titleURL: string): Observable<Post> {
        return this.http.get<Post>(postsURL + titleURL);
    }

    /**
     * Finds the previous post based on titleURL.
     *
     * @param titleURL The titleURL of the current post.
     */
    getPreviousPostTitleUrl(titleURL: string): Observable<{ titleURL: string }> {
        return this.http.get<{ titleURL: string }>(postsURL + titleURL + '/previous');
    }

    /**
     * Finds the next post based on titleURL.
     *
     * @param titleURL The titleURL of the current post.
     */
    getNextPostTitleUrl(titleURL: string): Observable<{ titleURL: string }> {
        return this.http.get<{ titleURL: string }>(postsURL + titleURL + '/next');
    }

    /**
     * Loads the slides.
     */
    loadSlides(): Observable<Slide[]> {
        return this.http.get<Slide[]>(slidesURL);
    }

    /**
     * Loads the contents of the about page.
     */
    getAbout(): Observable<About> {
        return this.http.get<About>(aboutURL).pipe(map(e => new About(e)));
    }

    /**
     * Loads the contact information.
     */
    getContact(): Observable<Contact> {
        return this.http.get<Contact>(contactURL);
    }
}
