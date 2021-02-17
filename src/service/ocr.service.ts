import { ReadImageDTO } from '../dto/ReadImage.dto';
import { ServiceResponse } from '../helper/ServiceResponse';
import { createWorker } from 'tesseract.js';
const path = require('path');

export const readImageService = async (data: ReadImageDTO): Promise<ServiceResponse> => {
    const worker = createWorker({
        cachePath: path.join('/tmp'),
        logger: m => console.log("[OCR] ",m)
    });

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    try {
        const { data: { text } } = await worker.recognize(data.image)
        //const tesseractData = await worker.recognize(data.image);
        console.log(text);
        await worker.terminate();
        return new ServiceResponse({ success: true, data: text })
    } catch (err) {
        return new ServiceResponse({ success: false, error: err });
    }
}