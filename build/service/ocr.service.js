"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.readImageService = void 0;
const ServiceResponse_1 = require("../helper/ServiceResponse");
const tesseract_js_1 = require("tesseract.js");
const path = require('path');
const readImageService = async (data) => {
    const worker = tesseract_js_1.createWorker({
        cachePath: path.join('/tmp'),
        logger: m => console.log("[OCR] ", m)
    });
    const processLanguage = data.lang ? data.lang : "eng";
    await worker.load();
    await worker.loadLanguage(processLanguage);
    await worker.initialize(processLanguage);
    try {
        const { data: { text } } = await worker.recognize(data.image);
        //const tesseractData = await worker.recognize(data.image);
        console.log(text);
        await worker.terminate();
        return new ServiceResponse_1.ServiceResponse({ success: true, data: text });
    }
    catch (err) {
        return new ServiceResponse_1.ServiceResponse({ success: false, error: err });
    }
};
exports.readImageService = readImageService;
//# sourceMappingURL=ocr.service.js.map