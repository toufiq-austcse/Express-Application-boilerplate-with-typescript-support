import {Repository} from "./repository";
import {User, UserDocument} from "../models/User";
import {inject} from "inversify";
import {TYPES} from "../types/types";
import logger from "../config/log";


export class UserRepository extends Repository<UserDocument, User> {
    constructor(@inject(TYPES.UserModel) UserModel: any) {
        super(UserModel);
       // this.model = UserModel;
    }
}
