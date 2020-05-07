/**
 * Created by WebStorm
 * User: Md. Toufiqul Islam
 * Date: 5/7/2020
 * Time: 7:50 AM

 * Feature: #Enter feature name here
 # Enter feature description here
 */
import * as jwt from 'jsonwebtoken';
import {injectable} from "inversify";

@injectable()
export class JwtService {
    private privateKey = 'shortlyPrivateKey';

    getToken(payload: any): string {
        return jwt.sign(payload, this.privateKey, {
            expiresIn: '1h'
        });
    }

    verify(token: string): any {
        return jwt.verify(token, this.privateKey);
    }
}
