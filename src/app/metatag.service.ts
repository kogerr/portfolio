import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { MetatagInfo } from './models/metatag-info';
const workBaseURL = 'http://199.247.23.37/work/';
const coverBaseURL = 'http://199.247.23.37/images/cover/';

@Injectable()
export class MetatagService {
    constructor(private meta: Meta) { }

    update(metatagInfo: MetatagInfo): void {
        this.clearMetaData();
        this.setMetaData(this.tranformData(metatagInfo));
    }

    private clearMetaData(): void {
        this.meta.removeTag('name=\'og:url\'');
        this.meta.removeTag('name=\'og:title\'');
        this.meta.removeTag('name=\'og:description\'');
        this.meta.removeTag('name=\'og:image\'');
    }

    private tranformData(metatagInfo: MetatagInfo): MetatagInfo {
        let url = workBaseURL + metatagInfo.url;
        let description = metatagInfo.description.substring(0, metatagInfo.description.indexOf('.') + 1);
        let image = coverBaseURL + metatagInfo.image;
        return { title: metatagInfo.title, url, description, image };
    }

    private setMetaData(metatagInfo: MetatagInfo): void {
        this.meta.addTags([
            {name: 'og:url', content: metatagInfo.url},
            {name: 'og:title', content: metatagInfo.title},
            {name: 'og:description', content: metatagInfo.description},
            {name: 'og:image', content: metatagInfo.image},
            {name: 'og:type', content: 'article'}
        ], false);
    }

}
