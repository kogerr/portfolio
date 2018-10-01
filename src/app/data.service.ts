import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from './models/post';
import { Slide } from './models/slide';
import { About } from './models/about.interface';
import { Contact } from './models/contact';
import { map, shareReplay } from 'rxjs/operators';

const postsURL = 'api/posts/';
const slidesURL = 'api/slides/';
const aboutURL = 'api/about/';
const contactURL = 'api/contact/';
const preloadURL = 'api/images/preload';

@Injectable()
export class DataService {
    constructor(private http: HttpClient) { }

    postCache: Array<Post>;
    timeout: NodeJS.Timer;

    /**
     * Loads all the posts.
     *
     * @returns an array of the posts
     */
    loadPosts(): Observable<Post[]> {
        let posts: Observable<Post[]>;
        if (this.postCache && this.postCache.length > 0) {
            posts = Observable.create(subscriber => {
                subscriber.next(this.postCache);
                subscriber.complete();
            });
            this.updatePostCache(1200);
        } else {
            clearTimeout(this.timeout);
            posts = this.http.get<Post[]>(postsURL).pipe(shareReplay(1));
            posts.subscribe(data => this.postCache = data);
        }
        return posts;
    }

    /**
     * Gets one post by the titleURL.
     *
     * @param titleURL title URL
     */
    getPost(titleURL: string): Observable<Post> {
        let post: Observable<Post>;
        if (this.postCache && this.postCache.length > 0 && this.postCache.find(p => titleURL === p.titleURL)) {
            post = Observable.create(subscriber => {
                subscriber.next(this.postCache.find(p => titleURL === p.titleURL));
                subscriber.complete();
            });
        } else {
            post = this.http.get<Post>(postsURL + titleURL);
        }
        this.updatePostCache(1200);
        return post;
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

    private findSurroundingPostTitleUrls = (posts, titleURL) => {
        let postsSorted = posts.sort((a, b) => a.index - b.index);
        let index = postsSorted.findIndex((e) => e.titleURL === titleURL);
        let next = postsSorted[index + 1];
        if (!next) {
            next = postsSorted[0];
        }
        let previous = postsSorted[index - 1];
        if (!previous) {
            previous = postsSorted[postsSorted.length - 1];
        }
        return { previous: previous.titleURL, next: next.titleURL };
    }

    getSurroundingPostTitleUrls(titleURL: string): Observable<{ previous: string, next: string }> {
        return this.loadPosts().pipe(map(posts => this.findSurroundingPostTitleUrls(posts, titleURL)));
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

    getPreloadImages(): Observable<Array<string>> {
        return this.http.get<Array<string>>(preloadURL);
    }

    updatePostCache(delay?: number): void {
        clearTimeout(this.timeout);
        let update = () => this.http.get<Post[]>(postsURL).subscribe(data => this.postCache = data);
        if (delay) {
            this.timeout = setTimeout(() => update(), delay);
        } else {
            update();
        }
    }

}
