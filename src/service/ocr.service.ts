import { ReadImageDTO } from '../dto/ReadImage.dto';
import { ServiceResponse } from '../helper/ServiceResponse';
import { createWorker } from 'tesseract.js';
export const readImageService = async (data: ReadImageDTO): Promise<ServiceResponse> => {
    const worker = createWorker({
        logger: m => console.log(m)
    });

    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    try {
        const tesseractData = await worker.recognize(data.image);
        console.log(tesseractData);
        await worker.terminate();
        return new ServiceResponse({ success: true, data: tesseractData })
    } catch (err) {
        return new ServiceResponse({ success: false, error: err });
    }
}