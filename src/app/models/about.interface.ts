export class About {
    constructor(other: About) {
        this.intro = other.intro;
        this.exhibitions = other.exhibitions.map(e => new IndexedText(e));
        this.clients = other.clients.map(e => new IndexedText(e));
        this.printPublications = other.printPublications.map(e => new PossiblyClickable(e));
        this.onlinePublications = other.onlinePublications.map(e => new PossiblyClickable(e));
        this.awards = other.awards.map(e => new HeaderAndLines(e));
        this.images = other.images;
    }

    intro: string;
    exhibitions: Array<IndexedText>;
    clients: Array<IndexedText>;
    printPublications: Array<PossiblyClickable>;
    onlinePublications: Array<PossiblyClickable>;
    awards: Array<HeaderAndLines>;
    images: Array<string>;
}

export class IndexedText {
    constructor(other: any) {
        this.index = other.index;
        this.text = other.text || '';
    }

    index: number;
    text: string;
}

export class PossiblyClickable extends IndexedText {
    constructor(other: PossiblyClickable) {
        super(other);
        this.url = other.url || '';
    }

    url: string;
}

export class HeaderAndLines {
    constructor(other: HeaderAndLines) {
        this.index = other.index;
        this.header = other.header || '';
        this.lines = Array.from(other.lines || '');
    }

    index: number;
    header: string;
    lines: Array<string>;
}
