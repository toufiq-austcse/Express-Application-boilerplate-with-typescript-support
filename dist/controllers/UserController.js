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
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const UserService_1 = require("../services/UserService");
const validate_1 = require("../validators/validate");
const validators_1 = require("../validators");
const HashService_1 = require("../services/HashService");
const JwtService_1 = require("../services/JwtService");
const apiresponse_1 = require("../shared/apiresponse");
const AuthService_1 = require("../services/AuthService");
const HttpStatusCodes_1 = require("../shared/HttpStatusCodes");
const type_1 = require("../types/type");
let UserController = class UserController extends inversify_express_utils_1.BaseHttpController {
    constructor(userService, hashService, jwtService, authService) {
        super();
        this.userService = userService;
        this.hashService = hashService;
        this.jwtService = jwtService;
        this.authService = authService;
    }
    create(user, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                user.password = yield this.hashService.getHashedPassword(user.password);
                const dbUser = yield this.userService.create(user);
                const token = yield this.jwtService.getToken({ _id: dbUser['_id'], email: dbUser.email });
                return this.json(apiresponse_1.default(HttpStatusCodes_1.CREATED, '', [{ token, token_type: 'Bearer' }]), HttpStatusCodes_1.CREATED.code);
            }
            catch (e) {
                return this.json(apiresponse_1.default(HttpStatusCodes_1.SERVER_ERROR, e.message, []), HttpStatusCodes_1.SERVER_ERROR.code);
            }
        });
    }
    auth(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = body;
                const user = yield this.authService.authUser(email, password);
                if (user) {
                    const token = yield this.jwtService.getToken({ _id: user['_id'], email: user.email });
                    return this.json(apiresponse_1.default(HttpStatusCodes_1.OK, '', [{ token, token_type: 'Bearer' }]), HttpStatusCodes_1.OK.code);
                }
                else {
                    return this.json(apiresponse_1.default(HttpStatusCodes_1.UNAUTHORIZED, '', []), 401);
                }
            }
            catch (e) {
                return this.json(apiresponse_1.default(HttpStatusCodes_1.SERVER_ERROR, e.message, []), HttpStatusCodes_1.SERVER_ERROR.code);
            }
        });
    }
    getUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.json(apiresponse_1.default(HttpStatusCodes_1.OK, '', [{ user: body.user }]), HttpStatusCodes_1.OK.code);
            }
            catch (e) {
                return this.json(apiresponse_1.default(HttpStatusCodes_1.SERVER_ERROR, e.message, []), HttpStatusCodes_1.SERVER_ERROR.code);
            }
        });
    }
};
__decorate([
    inversify_express_utils_1.httpPost('', validators_1.default(validate_1.userValidator)),
    __param(0, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    inversify_express_utils_1.httpPost('/auth'),
    __param(0, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "auth", null);
__decorate([
    inversify_express_utils_1.httpGet('', type_1.TYPES.AuthMiddleware),
    __param(0, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
UserController = __decorate([
    inversify_express_utils_1.controller('/api/v1/user'),
    __param(0, inversify_1.inject(UserService_1.UserService)),
    __param(1, inversify_1.inject(HashService_1.HashService)),
    __param(2, inversify_1.inject(JwtService_1.JwtService)),
    __param(3, inversify_1.inject(AuthService_1.AuthService)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map