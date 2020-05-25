/**
 * Created by WebStorm
 * User: Md. Toufiqul Islam
 * Date: 5/7/2020
 * Time: 7:50 AM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import * as jwt from 'jsonwebtoken';
import {provide} from "inversify-binding-decorators";
import {IJwtService} from "./base/IJwtService";

@provide(JwtService)
export class JwtService implements IJwtService {
    private privateKey = 'shortlyPrivateKey';

    getToken(payload: any): string {
        return jwt.sign(payload, this.privateKey);
    }

    verify(token: string): any {
        return jwt.verify(token, this.privateKey);
    }
}
