import 'reflect-metadata';
import {BaseHttpController, controller, httpPost, requestBody} from "inversify-express-utils";
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
import getContent from "../shared/apiresponse";
import {AuthService} from "../services/AuthService";
import {IAuthService} from "../services/base/IAuthService";

@controller('/api/v1/user')
export class UserController extends BaseHttpController {
    constructor(@inject(UserService) private userService: IUserService,
                @inject(HashService) private hashService: IHashService,
                @inject(JwtService) private jwtService: IJwtService,
                @inject(AuthService) private authService: IAuthService) {
        super();

    }

    @httpPost('', validate(userValidator))
    public async create(@requestBody()user: User) {
        try {
            user.password = await this.hashService.getHashedPassword(user.password);
            let dbUser = await this.userService.create(user);
            let token = await this.jwtService.getToken({_id: dbUser['_id'], email: dbUser.email});
            return this.json(getContent(201, 'Created', '', [{token: token, token_type: 'Bearer'}]), 201)
        } catch (e) {
            return this.json(getContent(500, 'Internal Server Error', e.message, []), 500)

        }
    }

    @httpPost('/auth')
    public async auth(@requestBody() body: any) {
        try {

            let {email, password} = body;
            let user = await this.authService.authUser(email, password);
            if (user) {
                let token = await this.jwtService.getToken({_id: user['_id'], email: user.email});
                return this.json(getContent(200, 'Ok', '', [{token: token, token_type: 'Bearer'}]), 200)
            } else {
                return this.json(getContent(401, 'Unauthorized', '', []), 401)
            }
        } catch (e) {
            return this.json(getContent(500, 'Internal Server Error', e.message, []), 500)
        }
    }
}
