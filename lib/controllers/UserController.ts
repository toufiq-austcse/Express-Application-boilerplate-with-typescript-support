import 'reflect-metadata';
import {controller, httpGet} from "inversify-express-utils";
import CustomResponse from "../shared/CustomResponse";
import {inject} from "inversify";
import {TYPES} from "../types/types";
import {UserService} from "../services/UserService";


@controller('/user')
export class UserController {
    constructor(@inject(TYPES.UserService) private userService: UserService) {
    }

    @httpGet('')
    public async getUser() {
        return new CustomResponse(200, 'OK', '', this.userService.getUsers())
    }


}
