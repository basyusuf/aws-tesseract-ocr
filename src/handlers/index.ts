import * as readImage from './readImage';
import * as uploadImage from './uploadImage';

//Export all handler in index.js
module.exports = {
    readImage: readImage.handler,
    uploadImage: uploadImage.handler
};
