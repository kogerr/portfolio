import * as dbService from '../db.service';
import { About } from '../../models/frontModels';
import * as logger from '../logger';

let aboutCache: About;
update();

/**
 * Fills the About cache with About from database.
 */
export function update(): void {
    dbService.getAbout().then(data =>
        aboutCache = data
    ).catch((err) => {
        logger.error(err);
    });
}

export function getAbout(): About {
    return aboutCache;
}
