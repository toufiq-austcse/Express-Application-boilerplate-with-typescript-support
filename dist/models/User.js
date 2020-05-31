"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    email: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
exports.UserModel = mongoose_1.model('User', userSchema);
//# sourceMappingURL=User.js.map