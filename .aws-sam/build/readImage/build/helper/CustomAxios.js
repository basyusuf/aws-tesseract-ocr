"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const CustomAxios = axios_1.default;
CustomAxios.interceptors.request.use(function (config) {
    config.metadata = { startTime: new Date() };
    return config;
}, function (error) {
    return Promise.reject(error);
});
CustomAxios.interceptors.response.use(function (response) {
    response.config.metadata.endTime = new Date();
    response.duration = response.config.metadata.endTime - response.config.metadata.startTime;
    return response;
}, function (error) {
    error.config.metadata.endTime = new Date();
    error.duration = error.config.metadata.endTime - error.config.metadata.startTime;
    return Promise.reject(error);
});
exports.default = CustomAxios;
//# sourceMappingURL=CustomAxios.js.map