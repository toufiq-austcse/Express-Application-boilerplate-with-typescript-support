"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var HashService_1;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by WebStorm
 * User: Md. Toufiqul Islam
 * Date: 5/7/2020
 * Time: 8:10 AM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
const bcrypt = require("bcrypt");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
let HashService = HashService_1 = class HashService {
    getHashedPassword(givenPass) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                bcrypt.hash(givenPass, 10, (err, encrypted) => {
                    if (err) {
                        return reject(err);
                    }
                    resolve(encrypted);
                });
            });
        });
    }
    matchPassword(givenPass, encryptedPass) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                bcrypt.compare(givenPass, encryptedPass, (err, same) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(same);
                });
            });
        });
    }
};
HashService = HashService_1 = __decorate([
    inversify_binding_decorators_1.provide(HashService_1)
], HashService);
exports.HashService = HashService;
//# sourceMappingURL=HashService.js.map