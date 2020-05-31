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
var AuthService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const inversify_1 = require("inversify");
const UserService_1 = require("./UserService");
const HashService_1 = require("./HashService");
let AuthService = AuthService_1 = class AuthService {
    constructor(userService, hashService) {
        this.userService = userService;
        this.hashService = hashService;
    }
    authUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getByEmail(email);
                if (users.length === 0) {
                    return null;
                }
                const isPasswordMatched = yield this.hashService.matchPassword(password, users[0].password);
                return isPasswordMatched ? users[0] : null;
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
};
AuthService = AuthService_1 = __decorate([
    inversify_binding_decorators_1.provide(AuthService_1),
    __param(0, inversify_1.inject(UserService_1.UserService)),
    __param(1, inversify_1.inject(HashService_1.HashService)),
    __metadata("design:paramtypes", [Object, Object])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map