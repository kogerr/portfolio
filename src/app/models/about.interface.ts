import { PossiblyClickable } from './possibly-clickable';
import { TitledLines } from './titled-lines';

export interface About {
    arsPoetica1: string;
    arsPoetica2: string;
    exhibitions: string[];
    clients: string[];
    printPublications: PossiblyClickable[];
    onlinePublications: PossiblyClickable[];
    awards: TitledLines[];
}
