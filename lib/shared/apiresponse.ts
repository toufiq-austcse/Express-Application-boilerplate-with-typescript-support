import {HttpStatus} from "./HttpStatusCodes";

const getContent = (httpStatus: HttpStatus, message: string, data: any) => {
    return {
        code: httpStatus.code,
        status: httpStatus.status,
        message: message,
        data: data
    }
}
export default getContent;
