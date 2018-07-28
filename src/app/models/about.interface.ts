export interface About {
    intro: string;
    exhibitions: IndexedText[];
    clients: IndexedText[];
    printPublications: PossiblyClickable[];
    onlinePublications: PossiblyClickable[];
    awards: TitledLines[];
}

export interface IndexedText {
    index: number;
    text: string;
}

export interface PossiblyClickable extends IndexedText {
    url: string;
}

export interface TitledLines {
    index: number;
    title: string;
    lines: string[];
}
