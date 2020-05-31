"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.status = 'Error';
        this.message = message;
    }
}
exports.default = HttpException;
//# sourceMappingURL=httpException.js.map