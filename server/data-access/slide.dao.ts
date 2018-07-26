import SlideModel, { SlideDocument } from '../models/slideModel';
import { Slide } from '../models/frontModels';
import * as logger from '../services/logger';
import { castMongoosePromise, deleteID, sortByIndex, UpdateResponse } from './dao_utils';

export function getSlides(): Promise<Array<SlideDocument>> {
    return new Promise((resolve, reject) => {
        SlideModel.find((err, docs) => {
            if (err) {
                reject(err);
            }
            resolve(sortByIndex(docs.map((slide) => deleteID(slide))));
        });
    });
}

export function saveSlide(slide: Slide): Promise<SlideDocument> {
    return new Promise((resolve, reject) => {
        SlideModel.count({}, (err, count) => {
            if (err) {
                logger.error(err);
            } else {
                slide.index = count;
            }
            let newSlide = new SlideModel(slide);
            newSlide.save((error, product) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(deleteID(product));
                }
            });
        });
    });
}

export function updateSlide(imageURL: string, update: any): Promise<UpdateResponse> {
    return castMongoosePromise(SlideModel.update({ imageURL }, update).exec());
}

export function deleteSlide(imageURL: string): Promise<UpdateResponse> {
    return castMongoosePromise(SlideModel.deleteOne({ imageURL }).exec());
}
