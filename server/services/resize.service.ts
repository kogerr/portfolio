import * as Jimp from 'jimp';

function calculateSize(width: number, height: number, proportions: { w: number, h: number })
    : { width: number, height: number } {
    if (width / proportions.w * proportions.h < height) {
        return { width: width, height: width / proportions.w * proportions.h };
    } else {
        return { width: height / proportions.h * proportions.w, height: height };
    }
}

export default function(filePath: string, newPath: string, proportions: { w: number, h: number })
    : Promise<{ success: boolean }> {
    return new Promise((resolve, reject) => {
        Jimp.read(filePath, (err, image) => {
            if (err) {
                reject(err);
            }
            let width = image.bitmap.width;
            let height = image.bitmap.height;
            let newSize = calculateSize(width, height, proportions);
            image.cover(newSize.width, newSize.height).write(newPath, (error) => {
                if (error) {
                    reject(error);
                }
                resolve({ success: true });
            });
        });
    });
}
