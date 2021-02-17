"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Response = void 0;
class Response {
    constructor(responseData) {
        this.statusCode = responseData.statusCode;
        this.body = responseData.body;
        this.event = responseData.event;
        this.message = responseData.message ? responseData.message : null;
    }
    get() {
        if (this.statusCode === 500) {
            console.info("Mail sender!");
        }
        return {
            statusCode: this.statusCode,
            body: JSON.stringify(this.body),
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
}
exports.Response = Response;
//# sourceMappingURL=Response.js.map