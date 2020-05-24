import * as joi from 'joi'
import CustomResponse from "../shared/CustomResponse";
import CustomMiddleware from "../middlewares/response.middleware";

const validate = (schema) => {
    return (req, res, next1) => {
        const {error} = joi.validate(req.body, schema);
        const valid = error == null;
        if (valid) {
            next1();
        } else {
            const {details} = error;
            const message = details.map(i => i.message).join(',');
            CustomMiddleware(new CustomResponse(400, '', message, []), req, res, next1)
        }
    }
}

export default validate
