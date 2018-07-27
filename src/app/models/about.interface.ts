export interface About {
    intro: string;
    exhibitions: string[];
    clients: IndexedText[];
    printPublications: PossiblyClickable[];
    onlinePublications: PossiblyClickable[];
    awards: TitledLines[];
}

export interface PossiblyClickable extends IndexedText {
    url?: string;
}

export interface TitledLines {
    index: number;
    title: string;
    lines: string[];
}

export interface IndexedText {
    index: number;
    text: string;
}
