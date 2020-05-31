"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
exports.userValidator = joi.object().keys({
    name: joi.string().required(),
    password: joi.string().required(),
    email: joi.string().email().required()
});
exports.linkValidator = joi.object().keys({
    url: joi.string().uri().required(),
});
//# sourceMappingURL=validate.js.map