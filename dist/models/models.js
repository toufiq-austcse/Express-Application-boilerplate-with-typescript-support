"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("./User");
const Link_1 = require("./Link");
const type_1 = require("../types/type");
/* Register your models here */
const models = [
    { type: type_1.TYPES.UserModel, model: User_1.UserModel },
    { type: type_1.TYPES.LinkModel, model: Link_1.LinkModel },
];
exports.default = models;
//# sourceMappingURL=models.js.map