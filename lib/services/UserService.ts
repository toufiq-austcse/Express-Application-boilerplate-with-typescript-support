import {UserRepository} from "../repositories/UserRepository";
import {User} from "../models/User";
import {inject, injectable} from "inversify";
import {TYPES} from "../types/types";

@injectable()
export class UserService {
    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {

    }
    create(user: User): Promise<User> {
        return this.userRepository.create(user);
    }
}
