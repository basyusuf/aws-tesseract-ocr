"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceResponse = void 0;
class ServiceResponse {
    constructor(responseData) {
        this.success = responseData.success;
        this.data = responseData.data;
        if (responseData.error) {
            this.error = responseData.error;
        }
    }
    get() {
        return this;
    }
}
exports.ServiceResponse = ServiceResponse;
//# sourceMappingURL=ServiceResponse.js.map