"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const inversify_express_utils_1 = require("inversify-express-utils");
const bodyParser = require("body-parser");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const inversify_1 = require("inversify");
const database_1 = require("./config/database");
const cors_config_1 = require("./config/cors.config");
require("./controllers");
const models_1 = require("./models/models");
const environments_1 = require("./environments");
const auth_middleware_1 = require("./middlewares/auth.middleware");
const type_1 = require("./types/type");
const log_1 = require("./config/log");
// start the server
const container = new inversify_1.Container();
container.bind(type_1.TYPES.AuthMiddleware).to(auth_middleware_1.AuthMiddleware);
models_1.default.forEach(i => container.bind(i.type).toConstantValue(i.model));
container.load(inversify_binding_decorators_1.buildProviderModule());
const server = new inversify_express_utils_1.InversifyExpressServer(container);
server.setConfig((app) => {
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    cors_config_1.configCors(app);
    database_1.connectToDatabase(app);
    app.use(bodyParser.json());
    app.use('/', express.static('public'));
});
const app = server.build();
app.listen(environments_1.PORT);
log_1.default.info(`Server started on port ${environments_1.PORT} :)`);
exports = module.exports = app;
//# sourceMappingURL=bootstrap.js.map