const sharp = require("sharp");

exports.handler = async (event) => {
    try {
        const image = event.image;
        return await sharp(image)
            .resize(event.sizeX, event.sizeY)
            .webp({quality: 85})
            .toBuffer();
    } catch (error) {
        console.error(error);
        throw new Error('Image processing failed.');
    }
};