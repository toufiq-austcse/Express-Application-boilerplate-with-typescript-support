"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Environment = require("../environments");
const log_1 = require("./log");
const DB_PASSWORD = process.env.DB_PWD || '';
const DB_USER = process.env.DB_USER || '';
const DB_HOST = process.env.DB_HOST || 'localhost:27017';
let DB_NAME = process.env.DB_NAME || 'demo';
function getDatabaseUrl() {
    const env = Environment.NODE_ENV;
    if (env === 'test' && !process.env.DB_NAME) {
        DB_NAME += '_test';
    }
    if (env !== 'localhost' && DB_USER && DB_PASSWORD) {
        return `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;
    }
    return `mongodb://${DB_HOST}/${DB_NAME}`;
}
function getDatabaseOptions() {
    /**
     * For details about server configuration parameters, see
     * http://mongoosejs.com/docs/connections.html
     * http://mongodb.github.io/node-mongodb-native/2.2/api/MongoClient.html
     */
    const TWO_MINUTES_IN_MS = 2 * 60 * 1000;
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
    let autoIndex = false;
    if (Environment.NODE_ENV === 'locahost') {
        autoIndex = true;
    }
    return {
        poolSize: 50,
        connectTimeoutMS: TWO_MINUTES_IN_MS,
        socketTimeoutMS: ONE_DAY_IN_MS,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    };
}
function connectToDatabase(app) {
    const dbUrl = getDatabaseUrl();
    const dbOptions = getDatabaseOptions();
    log_1.default.debug(`Database user: ${DB_USER}`);
    log_1.default.debug(`Database password: ${DB_PASSWORD}`);
    log_1.default.debug(`Database name: ${DB_NAME}`);
    log_1.default.info(`App database URL: ${dbUrl}`);
    mongoose.connect(dbUrl, dbOptions).catch();
    mongoose.connection.on('error', (err) => {
        log_1.default.error('mongoose.js error ', err.message);
    });
    mongoose.connection.on('reconnected', () => {
        log_1.default.warn(`mongoose.js reconnected`);
    });
    mongoose.connection.on('disconnected', (err) => {
        log_1.default.warn(`mongoose.js disconnect`, err);
    });
    mongoose.connection.on('timeout', (err) => {
        log_1.default.error(`mongoose.js request timeout`, err);
    });
    mongoose.connection.once('open', function () {
        log_1.default.info(`Connected with Database`);
    });
    app.set('dbClient', mongoose);
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=database.js.map