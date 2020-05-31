"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AuthMiddleware_1;
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const inversify_1 = require("inversify");
const HashService_1 = require("../services/HashService");
const JwtService_1 = require("../services/JwtService");
const apiresponse_1 = require("../shared/apiresponse");
const HttpStatusCodes_1 = require("../shared/HttpStatusCodes");
const UserService_1 = require("../services/UserService");
let AuthMiddleware = AuthMiddleware_1 = class AuthMiddleware extends inversify_express_utils_1.BaseMiddleware {
    constructor(hashService, jwtService, userService) {
        super();
        this.hashService = hashService;
        this.jwtService = jwtService;
        this.userService = userService;
    }
    handler(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const authorization = req.headers.authorization;
                if (!authorization) {
                    return res.status(HttpStatusCodes_1.UNAUTHORIZED.code).json(apiresponse_1.default(HttpStatusCodes_1.UNAUTHORIZED, 'authorization required in headers', []));
                }
                const accessToken = authorization.split(' ')[1];
                const decodedToken = this.jwtService.verify(accessToken);
                const user = yield this.userService.getByUserId(decodedToken['_id']);
                if (!user) {
                    return res.status(HttpStatusCodes_1.UNAUTHORIZED.code).json(apiresponse_1.default(HttpStatusCodes_1.UNAUTHORIZED, 'User Not Found', []));
                }
                req.body.user = _.omit(user, ['password']);
                next();
            }
            catch (e) {
                return res.status(HttpStatusCodes_1.SERVER_ERROR.code).json(apiresponse_1.default(HttpStatusCodes_1.SERVER_ERROR, e.message, []));
            }
        });
    }
};
AuthMiddleware = AuthMiddleware_1 = __decorate([
    inversify_binding_decorators_1.provide(AuthMiddleware_1),
    __param(0, inversify_1.inject(HashService_1.HashService)),
    __param(1, inversify_1.inject(JwtService_1.JwtService)),
    __param(2, inversify_1.inject(UserService_1.UserService)),
    __metadata("design:paramtypes", [Object, Object, Object])
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.middleware.js.map