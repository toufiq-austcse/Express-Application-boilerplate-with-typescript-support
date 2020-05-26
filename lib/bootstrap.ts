import 'reflect-metadata';
import * as express from 'express';

import {InversifyExpressServer} from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import {buildProviderModule} from "inversify-binding-decorators";
import {Container} from "inversify";
import {connectToDatabase} from "./config/database";
import {configCors} from "./config/cors.config";

import "./controllers";

import models from "./models/models";
import {PORT} from "./environments";
import {AuthMiddleware} from "./middlewares/auth.middleware";
import {TYPES} from "./types/type";


// start the server
let container = new Container();
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);

models.forEach(i => container.bind<any>(i.type).toConstantValue(i.model))
container.load(buildProviderModule())
let server = new InversifyExpressServer(container);

server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    configCors(app);
    connectToDatabase(app);
    app.use(bodyParser.json());
    app.use('/', express.static('public'));

});

let app = server.build();
app.listen(PORT);
console.log(`Server started on port ${PORT} :)`);

exports = module.exports = app;
