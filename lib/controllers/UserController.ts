import 'reflect-metadata';
import {controller, httpPost, requestBody} from "inversify-express-utils";
import {inject} from "inversify";
import {UserService} from "../services/UserService";
import {User} from "../models/User";
import {userValidator} from "../validators/validate";
import validate from "../validators";

@controller('/api/v1/user')
export class UserController {
    constructor(@inject(UserService) private userService: UserService) {
    }

    @httpPost('', validate(userValidator))
    public async create(@requestBody()user: User) {
        try {
            return user;
        } catch (e) {
            console.log(e)

        }
    }
}
