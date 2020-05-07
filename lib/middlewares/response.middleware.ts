import CustomResponse from "../shared/CustomResponse";
import {NextFunction, Request, Response} from "express";

function CustomMiddleware(myData:CustomResponse,request: Request, response: Response, next: NextFunction) {
    const code = myData.code || 500;
    const message = myData.message;
    const {status,data} = myData;
    // console.log(status,data);
    // console.log(myData);
    response
        .status(code)
        .send({
            code,
            status,
            message,
            data
        })
}

export default CustomMiddleware
