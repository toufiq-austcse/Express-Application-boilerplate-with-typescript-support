import {Repository} from "./base/repository";
import {User, UserDocument} from "../models/User";
import {inject} from "inversify";
import {TYPES} from "../types/types";
import {provide} from "inversify-binding-decorators";

@provide(TYPES.UserRepository)
export class UserRepository extends Repository<UserDocument, User> {
    constructor(@inject(TYPES.UserModel) UserModel: any) {
        super(UserModel);
        // this.model = UserModel;
    }
}
