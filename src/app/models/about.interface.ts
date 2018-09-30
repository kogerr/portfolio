export class About {
    constructor(other: About) {
        this.intro = Array.isArray(other.intro) ? other.intro.map(e => new IndexedText(e))
            : new Array<IndexedText>();
        this.exhibitions = Array.isArray(other.exhibitions) ? other.exhibitions.map(e => new IndexedText(e))
            : new Array<IndexedText>();
        this.clients = Array.isArray(other.clients) ? other.clients.map(e => new IndexedText(e))
            : new Array<IndexedText>();
        this.printPublications = Array.isArray(other.printPublications) ? other.printPublications.map(e => new PossiblyClickable(e))
            : new Array<PossiblyClickable>();
        this.onlinePublications = Array.isArray(other.onlinePublications) ? other.onlinePublications.map(e => new PossiblyClickable(e))
            : new Array<PossiblyClickable>();
        this.awards = Array.isArray(other.clients) ? other.awards.map(e => new HeaderAndLines(e))
            : new Array<HeaderAndLines>();
        this.images = other.images;
    }

    intro: Array<IndexedText>;
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
