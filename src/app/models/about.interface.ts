export interface About {
    intro: string;
    exhibitions: IndexedText[];
    clients: IndexedText[];
    printPublications: PossiblyClickable[];
    onlinePublications: PossiblyClickable[];
    awards: HeaderAndLines[];
}

export interface IndexedText {
    index: number;
    text: string;
}

export interface PossiblyClickable extends IndexedText {
    url: string;
}

export interface HeaderAndLines {
    index: number;
    header: string;
    lines: string[];
}
