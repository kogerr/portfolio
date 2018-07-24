import * as dbService from '../db.service';
import { Contact } from '../../models/frontModels';
import * as logger from '../logger';

let contactCache: Contact;
update();

/**
 * Fills the Contact cache with Contact from database.
 */
export function update(): void {
    dbService.getContact().then(data =>
        contactCache = data
    ).catch((err) => {
        logger.error(err);
    });
}

export function getContact(): Contact {
    return contactCache;
}
