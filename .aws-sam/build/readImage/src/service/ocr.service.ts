import { ReadImageDTO } from '../dto/ReadImage.dto';
import { ServiceResponse } from '../helper/ServiceResponse';
import { createWorker } from 'tesseract.js';
const path = require('path');

export const readImageService = async (data: ReadImageDTO): Promise<ServiceResponse> => {
    const worker = createWorker({
        cachePath: path.join('/tmp'),
        logger: m => console.log("[OCR] ",m)
    });
    const processLanguage = data.lang ? data.lang : "eng"
    await worker.load();
    await worker.loadLanguage(processLanguage);
    await worker.initialize(processLanguage);
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