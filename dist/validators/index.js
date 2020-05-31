"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const joi = require("joi");
const apiresponse_1 = require("../shared/apiresponse");
const HttpStatusCodes_1 = require("../shared/HttpStatusCodes");
const validate = (schema) => {
    return (req, res, next1) => {
        const { error } = joi.validate(req.body, schema);
        const valid = error === null;
        if (valid) {
            next1();
        }
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(',');
            res.status(400).json(apiresponse_1.default(HttpStatusCodes_1.BAD_REQUEST, message, []));
        }
    };
};
exports.default = validate;
//# sourceMappingURL=index.js.map