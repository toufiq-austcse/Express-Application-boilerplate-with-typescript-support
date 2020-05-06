import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes/Routes";
import CustomMiddleware from "./middlewares/response.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import {connectToDatabase} from "./config/database";
import {configCors} from "./config/cors.config";

class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        configCors(this.app);
        this.routePrv.routes(this.app);
        connectToDatabase(this.app);
        this.initializeMiddleware();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({extended: false}));
    }


    private initializeMiddleware() {
        this.app.use(CustomMiddleware);
        this.app.use(errorMiddleware);
    }

}

export default new App().app;
