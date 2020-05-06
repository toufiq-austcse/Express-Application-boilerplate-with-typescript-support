import {NextFunction, Request, Response} from 'express'
import {ContactController} from "../controllers/crmController";

export class Routes {
  //  public contactController: ContactController = new ContactController();

    public routes(app): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            });

        // // Contact
        // app.route('/contact')
        // // GET endpoint
        //     .get((req: Request, res: Response, next: NextFunction) => {
        //         //Middleware
        //         if (req.params.publickey != 'sady') {
        //             res.status(401).send('You shall not pass!');
        //         } else {
        //             next();
        //         }
        //     }, this.contactController.getContacts)
        //     // POST endpoint
        //     .post(this.contactController.addNewContact);
        //
        // // Contact detail
        // app.route('/contact/:contactId')
        // // get specific contact
        //     .get(this.contactController.getContactWithID)
        //     .put(this.contactController.updateContact)
        //     .delete(this.contactController.deleteContact)
    }
}
