import * as mongoose from 'mongoose';
import {Document, model} from "mongoose";

export interface User {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
export interface UserDocument extends User, Document {}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        default: true
    }
}, {
    timestamps: true
});
export const UserModel = model<UserDocument>('User', userSchema);
