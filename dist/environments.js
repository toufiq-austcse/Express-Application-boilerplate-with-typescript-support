"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
dotenv.config({ path: process.env.DOTENV });
exports.NODE_ENV = process.env.NODE_ENV || 'localhost';
exports.PORT = process.env.PORT || 3000;
exports.JWT_KEY = process.env.JWT_KEY;
function getBaseApiUrl() {
    switch (exports.NODE_ENV) {
        case 'development':
            return process.env.DEV_URL;
        case 'production':
            return process.env.PROD_URL;
        default:
            return `http://localhost:${exports.PORT}`;
    }
}
exports.BASE_URL = getBaseApiUrl();
//# sourceMappingURL=environments.js.map