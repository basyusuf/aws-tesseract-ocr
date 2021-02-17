"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const DTOValidator = async (DTO, BODY, description) => {
    console.info('Validation start! Description: ', description);
    console.info('Data to check: ', BODY);
    const checkedItem = class_transformer_1.plainToClass(DTO, BODY);
    console.info('Checked Class:', checkedItem);
    const errorResult = await class_validator_1.validate(checkedItem, {});
    console.log('Validation Error Result: ', errorResult);
    // Errors is an array of validation errors
    if (errorResult.length > 0) {
        let errorTexts = [];
        for (let errorItem of errorResult) {
            if (errorItem.constraints) {
                errorTexts = errorTexts.concat(errorItem.constraints);
            }
            if (errorItem.children && errorItem.children.length > 0) {
                errorItem.children.map((childİtem) => {
                    errorTexts = errorTexts.concat(childİtem.constraints);
                });
            }
        }
        return errorTexts;
    }
    else {
        // Pass DTO object to service
        return null;
    }
};
exports.default = DTOValidator;
//# sourceMappingURL=DTOValidator.js.map