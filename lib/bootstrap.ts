import 'reflect-metadata';
import * as express from 'express';

import {InversifyExpressServer} from 'inversify-express-utils';
import * as bodyParser from 'body-parser';
import {buildProviderModule} from "inversify-binding-decorators";
import {Container} from "inversify";
import {connectToDatabase} from "./config/database";
import {configCors} from "./config/cors.config";


import "./controllers/UserController";
import models from "./models";
import {PORT} from "./environments";


// start the server
let container = new Container();
models.forEach(i => container.bind<any>(i.types).toConstantValue(i.model))
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
