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
const mongoose_1 = require("mongoose");
require("reflect-metadata");
const inversify_1 = require("inversify");
/**
 * This Repository class is the base repository. It is an abstract class because it can only be
 * extended. This class is writen to support mongoose properly which means it will look different
 * if you use mongodb driver directly or use any other orm or database driver.
 *
 * The model property is the mongoose model in this case. For you, it can be mongodb collection for example.
 */
let Repository = class Repository {
    constructor(model) {
        this.model = model;
    }
    /**
     * Receives an ID and fetch data from database by that ID.
     * @param id Id of the document
     * @param projection Field to project properties. This is optional.
     */
    get(id, projection = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || !mongoose_1.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid Id');
            }
            const model = this.getModel();
            const doc = yield model.findById(id, projection).lean().exec();
            return doc;
        });
    }
    getAll(limit = 20, page = 1, sort, projection = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.getModel();
            const query = model.find({}, projection);
            if (sort) {
                query.sort(sort);
            }
            if (page > 0) {
                const skip = limit * (page - 1);
                query.skip(skip);
            }
            query.limit(limit);
            const docs = yield query.lean().exec();
            return docs;
        });
    }
    find(filter, limit = 10, page = 0, sort, projection) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.getModel();
            const query = model.find(filter, projection);
            if (sort) {
                query.sort(sort);
            }
            if (page > 0) {
                const skip = limit * (page - 1);
                query.skip(skip);
            }
            query.limit(limit);
            const docs = yield query.lean().exec();
            return docs;
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data) {
                throw new Error('Empty object provided');
            }
            const model = this.getModel();
            const doc = (yield model.create(data)).toObject();
            return doc;
        });
    }
    createMany(_data) {
        throw new Error('Method not implemented.');
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id || !mongoose_1.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid Id');
            }
            const model = this.getModel();
            yield model.findByIdAndRemove(id).exec();
        });
    }
    removeMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const model = this.getModel();
            if (Array.isArray(ids) && ids.length > 0) {
                yield model.deleteMany({ _id: { $in: ids } }).exec();
            }
            yield model.deleteMany({}).exec();
        });
    }
    getModel() {
        return this.model;
    }
};
Repository = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [mongoose_1.Model])
], Repository);
exports.Repository = Repository;
//# sourceMappingURL=repository.js.map