import 'reflect-metadata';
import {controller, httpPost, requestBody} from "inversify-express-utils";
import {inject} from "inversify";
import {UserService} from "../services/UserService";
import {User} from "../models/User";
import {userValidator} from "../validators/validate";
import validate from "../validators";
import {HashService} from "../services/HashService";
import {IUserService} from "../services/base/IUserService";
import {IHashService} from "../services/base/IHashService";
import {JwtService} from "../services/JwtService";
import {IJwtService} from "../services/base/IJwtService";
import CustomResponse from "../shared/CustomResponse";

@controller('/api/v1/user')
export class UserController {
    constructor(@inject(UserService) private userService: IUserService,
                @inject(HashService) private hashService: IHashService,
                @inject(JwtService) private jwtService: IJwtService) {
    }

    @httpPost('', validate(userValidator))
    public async create(@requestBody()user: User) {
        try {
            user.password = await this.hashService.getHashedPassword(user.password);
            let dbUser = await this.userService.create(user);
            let token = await this.jwtService.getToken({_id: dbUser['_id'], email: dbUser.email});
            return new CustomResponse(201, 'Created', '', [{token: token, token_type: 'Bearer'}])
        } catch (e) {
            return new CustomResponse(500, 'Internal Server Error', e.message, [])

        }
    }
}
