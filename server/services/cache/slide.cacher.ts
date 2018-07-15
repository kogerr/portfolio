import * as dbService from '../db.service';
import Slide from '../../models/Slide';
import * as logger from '../logger';

let slideCache: Array<Slide>;
update();

/**
 * Fills the Slide cache with Slides from database.
 */
export function update(): void {
    slideCache = new Array<Slide>();
    dbService.getSlides().then((data) => {
        data.forEach(slide => slideCache.push(slide));
    }).catch((err) => {
        logger.error(err);
    });
}

export function getSlides(): Array<Slide> {
    return slideCache;
}
