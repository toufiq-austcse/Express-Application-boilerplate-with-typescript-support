"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getContent = (httpStatus, message, data) => {
    return {
        code: httpStatus.code,
        status: httpStatus.status,
        message,
        data
    };
};
exports.default = getContent;
//# sourceMappingURL=apiresponse.js.map