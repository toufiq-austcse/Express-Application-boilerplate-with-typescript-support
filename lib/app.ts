import * as express from "express";
import * as bodyParser from "body-parser";
import {Routes} from "./routes/crmRoutes";
import * as mongoose from "mongoose";
import CustomMiddleware from "./middlewares/response.middleware";
import errorMiddleware from "./middlewares/error.middleware";
import {connectToDatabase} from "./config/database";
class App {

    public app: express.Application;
    public routePrv: Routes = new Routes();

    constructor() {
        this.app = express();
        this.config();
        this.routePrv.routes(this.app);
        connectToDatabase(this.app);
        this.initializeMiddlewares();
    }

    private config(): void {
        // support application/json type post data
        this.app.use(bodyParser.json());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({extended: false}));
    }

    // private mongoSetup(): void {
    //     mongoose.Promise = global.Promise;
    //     mongoose.connect(this.mongoUrl);
    // }

    private initializeMiddlewares(){
        this.app.use(CustomMiddleware);
        this.app.use(errorMiddleware);
    }

}

export default new App().app;
