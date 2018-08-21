import UserModel, { UserDocument } from '../models/userModel';
import { deleteID } from './dao_utils';

export function addUser(email: string, password: string): Promise<UserDocument> {
    return new Promise((resolve, reject) => {
        let newUser = new UserModel({email, password});
        newUser.save((err, product) => {
            if (err) {
                reject(err);
            }
            resolve(deleteID(product));
        });
    });
}

export function checkUser(email: string, password: string): Promise<{ found: boolean }> {
    return new Promise((resolve, reject) => {
        UserModel.find({ email, password }, (err, docs) => {
            if (err) {
                reject(err);
            }
            if (docs.length) {
                resolve({ found: true });
            } else {
                resolve({ found: false });
            }
        });
    });
}
