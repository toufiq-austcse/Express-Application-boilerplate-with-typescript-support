"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtService_1;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by WebStorm
 * User: Md. Toufiqul Islam
 * Date: 5/7/2020
 * Time: 7:50 AM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
const jwt = require("jsonwebtoken");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
const environments_1 = require("../environments");
let JwtService = JwtService_1 = class JwtService {
    getToken(payload) {
        return jwt.sign(payload, environments_1.JWT_KEY);
    }
    verify(token) {
        return jwt.verify(token, environments_1.JWT_KEY);
    }
};
JwtService = JwtService_1 = __decorate([
    inversify_binding_decorators_1.provide(JwtService_1)
], JwtService);
exports.JwtService = JwtService;
//# sourceMappingURL=JwtService.js.map