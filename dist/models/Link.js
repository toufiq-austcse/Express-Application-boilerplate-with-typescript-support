"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_1 = require("mongoose");
const Schema = mongoose.Schema;
const linkSchema = new Schema({
    url: {
        required: true,
        type: String,
    },
    unique_id: {
        type: String,
        unique: true,
        index: true,
        required: true
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
});
exports.LinkModel = mongoose_1.model('Link', linkSchema);
//# sourceMappingURL=Link.js.map