import {UserRepository} from "../repositories/UserRepository";
import {User} from "../models/User";
import {inject} from "inversify";
import {TYPES} from "../types/types";
import {provide} from "inversify-binding-decorators";

@provide(TYPES.UserService)
export class UserService {
    constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {
    }

    create(user: User): Promise<User> {
        return this.userRepository.create(user);
    }

    getUsers(): User[] {
        return [{
            firstName: "sadi"
        }]
    }
}
