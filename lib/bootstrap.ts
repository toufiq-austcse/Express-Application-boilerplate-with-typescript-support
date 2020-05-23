import 'reflect-metadata';
import * as express from 'express';

import {InversifyExpressServer } from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import CustomMiddleware from "./middlewares/response.middleware";
import {autoProvide, buildProviderModule} from "inversify-binding-decorators";
import {Container} from "inversify";
import {connectToDatabase} from "./config/database";
import {configCors} from "./config/cors.config";
import {UserModel} from "./models/User";
import {TYPES} from "./types/types";


import "./controllers/UserController";

// start the server
let container = new Container();
container.bind<any>(TYPES.UserModel).toConstantValue(UserModel)
container.load(buildProviderModule())
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    configCors(app);
    connectToDatabase(app);
    app.use(bodyParser.json());
    app.use(CustomMiddleware)
    app.use('/', express.static('public'));
    // app.use(helmet());
});

let app = server.build();
app.listen(8081);
console.log('Server started on port 8081 :)');

exports = module.exports = app;
