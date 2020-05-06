import {Request, Response} from 'express';
import {UserController} from "../../controllers/UserController";


export class Routes {
    private BASE_URL = '/api/v1'

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                });
            });

        // User
        app.route(this.BASE_URL+'/user')
            .post(UserController.createUser);


    }
}
