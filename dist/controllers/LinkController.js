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
/**
 * Created by WebStorm
 * User: Md. Toufiqul Islam
 * Date: 5/26/2020
 * Time: 1:03 PM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
const uniqid = require("uniqid");
const inversify_express_utils_1 = require("inversify-express-utils");
const validate_1 = require("../validators/validate");
const validators_1 = require("../validators");
const urlValidator = require("valid-url");
const apiresponse_1 = require("../shared/apiresponse");
const HttpStatusCodes_1 = require("../shared/HttpStatusCodes");
const environments_1 = require("../environments");
const inversify_1 = require("inversify");
const LinkService_1 = require("../services/LinkService");
const type_1 = require("../types/type");
let LinkController = class LinkController extends inversify_express_utils_1.BaseHttpController {
    constructor(linkService) {
        super();
        this.linkService = linkService;
    }
    createLink(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url, user } = body;
            if (urlValidator.isHttpUri(url) || urlValidator.isHttpsUri(url)) {
                const uniqId = uniqid();
                yield this.linkService.create({
                    url,
                    unique_id: uniqId,
                    user_id: user['_id']
                });
                return this.json(apiresponse_1.default(HttpStatusCodes_1.OK, 'Ok', [{ base_url: environments_1.BASE_URL, unique_id: uniqId }]), HttpStatusCodes_1.OK.code);
            }
            else {
                return this.json(apiresponse_1.default(HttpStatusCodes_1.BAD_REQUEST, 'Invalid Url', []), HttpStatusCodes_1.BAD_REQUEST.code);
            }
        });
    }
};
__decorate([
    inversify_express_utils_1.httpPost('', validators_1.default(validate_1.linkValidator), type_1.TYPES.AuthMiddleware),
    __param(0, inversify_express_utils_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LinkController.prototype, "createLink", null);
LinkController = __decorate([
    inversify_express_utils_1.controller('/api/v1/link'),
    __param(0, inversify_1.inject(LinkService_1.LinkService)),
    __metadata("design:paramtypes", [Object])
], LinkController);
exports.LinkController = LinkController;
//# sourceMappingURL=LinkController.js.map