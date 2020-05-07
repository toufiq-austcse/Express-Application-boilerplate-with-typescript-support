import {Container} from "inversify";
import {IRepository} from "../repositories/base/repository";
import {TYPES} from "../types/types";
import {UserRepository} from "../repositories/UserRepository";
import {UserModel} from "../models/User";
import {JwtService} from "../services/JwtService";
import {HashService} from "../services/HashService";


const shortlyContainer = new Container();

shortlyContainer.bind<IRepository<any, any>>(TYPES.UserRepository).to(UserRepository);
shortlyContainer.bind<any>(TYPES.UserModel).toConstantValue(UserModel);
shortlyContainer.bind<JwtService>(TYPES.JwtService).to(JwtService);
shortlyContainer.bind<HashService>(TYPES.HashService).to(HashService);
export default shortlyContainer;
