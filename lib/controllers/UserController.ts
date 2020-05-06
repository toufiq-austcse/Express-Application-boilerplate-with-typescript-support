import {Request, Response} from 'express';
import {UserService} from "../services/UserService";
import shortlyContainer from "../config/inversify.config";
import 'reflect-metadata';

let userService = shortlyContainer.resolve<UserService>(UserService);


export class UserController {

    static async createUser(req: Request, res: Response) {

        let resU = await userService.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            email: req.body.email
        });
        return res.json(resU);
    }


}
