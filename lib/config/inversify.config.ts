import {Container} from "inversify";
import {IRepository} from "../repositories/repository";
import {TYPES} from "../types/types";
import {UserRepository} from "../repositories/UserRepository";
import {UserModel} from "../models/User";


let shortlyContainer = new Container();

shortlyContainer.bind<IRepository<any, any>>(TYPES.UserRepository).to(UserRepository);
shortlyContainer.bind<any>(TYPES.UserModel).toConstantValue(UserModel);
export default shortlyContainer;
