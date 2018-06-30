export interface About {
    intro: string;
    exhibitions: string[];
    clients: string[];
    printPublications: PossiblyClickable[];
    onlinePublications: PossiblyClickable[];
    awards: TitledLines[];
}

export interface TitledLines {
    title: string;
    lines: string[];
}

export interface PossiblyClickable {
    text: string;
    url?: string;
}
