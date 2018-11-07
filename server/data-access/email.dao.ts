import EmailModel, {EmailDocument} from '../models/emailModel';
import {Email} from '../models/frontModels';

export function getEmails(): Promise<Array<EmailDocument>> {
    return new Promise((resolve, reject) => {
        EmailModel.find((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(docs);
        });
    });
}

export function saveEmail(email: Email): Promise<EmailDocument> {
    return new Promise((resolve, reject) => {
        let newEmail = new EmailModel(email);
        newEmail.save((error, product) => {
            if (error) {
                reject(error);
            } else {
                resolve(product);
            }
        });
    });
}

export function deleteEmailById(id: string): Promise<{ deleted: boolean }> {
    return new Promise((resolve, reject) => {
        EmailModel.deleteOne({ id }, err => {
            if (err) {
                reject(err);
            } else {
                resolve({ deleted: true });
            }
        });
    });
}
