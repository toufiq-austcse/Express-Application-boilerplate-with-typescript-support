import {Request, Response} from 'express';
import {UserController} from "../controllers/UserController";


export class Routes {

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                });
            });

        // Contact
        app.route('/user')
            .post(UserController.createUser);

        // // Contact detail
        // app.route('/contact/:contactId')
        // // get specific contact
        //     .get(this.contactController.getContactWithID)
        //     .put(this.contactController.updateContact)
        //     .delete(this.contactController.deleteContact)
    }
}
