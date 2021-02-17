"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const Response_1 = require("../helper/Response");
const DTOValidator_1 = require("../service/DTOValidator");
const Request_dto_1 = require("../dto/Request.dto");
const ReadImage_dto_1 = require("../dto/ReadImage.dto");
const ocr_service_1 = require("../service/ocr.service");
const handler = async (event, context) => {
    // All log statements are written to CloudWatch
    console.info('received:', event);
    let checkRequestData = await DTOValidator_1.default(Request_dto_1.RequestDTO, event, 'Main Request Handler');
    if (checkRequestData) {
        return new Response_1.Response({ statusCode: 400, body: checkRequestData, event }).get();
    }
    else {
        //Use (try and catch) as much as possible
        try {
            const body = JSON.parse(event.body);
            const ErrorCheck = await DTOValidator_1.default(ReadImage_dto_1.ReadImageDTO, body, 'Read Image validation');
            if (ErrorCheck) {
                console.info('System have validation error. List:', ErrorCheck);
                return new Response_1.Response({ statusCode: 400, body: ErrorCheck, event }).get();
            }
            let readStatus = await ocr_service_1.readImageService(body);
            if (readStatus.success) {
                console.log("Data:", readStatus);
                console.info("Success");
                return new Response_1.Response({ statusCode: 200, body: readStatus.data, event }).get();
            }
            else {
                console.info("Failed");
                return new Response_1.Response({ statusCode: 400, event, body: { error: readStatus.error } }).get();
            }
        }
        catch (err) {
            console.error(err);
            return new Response_1.Response({ statusCode: 400, message: "Error occured while parsing body", event, body: null }).get();
        }
    }
};
exports.handler = handler;
//# sourceMappingURL=readImage.js.map