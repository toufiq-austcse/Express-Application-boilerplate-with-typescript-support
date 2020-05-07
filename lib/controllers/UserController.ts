import {NextFunction, Request, Response} from 'express';
import {UserService} from "../services/UserService";
import shortlyContainer from "../config/inversify.config";
import 'reflect-metadata';
import CustomResponse from "../shared/CustomResponse";
import {HashService} from "../services/HashService";
import {JwtService} from "../services/JwtService";
import {User} from "../models/User";
import logger from "../config/log";


const userService = shortlyContainer.resolve<UserService>(UserService);
const hashService = shortlyContainer.resolve<HashService>(HashService);
const jwtService = shortlyContainer.resolve<JwtService>(JwtService);


export class UserController {

    static async createUser(req: Request, res: Response, nextFunction: NextFunction) {
       try {
           let user: any = req.body;
           user.password = await hashService.getHashedPassword(user.password);

           user = await userService.create(user);
           logger.info(typeof user);
           const accessToken = jwtService.getToken({_id:user._id});
           return nextFunction(new CustomResponse(201, 'Created', '', {
               user,
               accessToken

           }));
       }catch (e) {
           return nextFunction(new CustomResponse(500, 'Internal Server Error', e.message, null));
       }
    }


}
