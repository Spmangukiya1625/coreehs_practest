import { ValidationError } from "../core/AppError.js";

export function validate(schema, source = "body") {
    return (req, res, next) => {
        console.log(req[source]);
        
        // console.log(req.method, req.originalUrl, req);
        const { error, value } = schema.validate(req[source], { abortEarly: false });
        if (error) {
            const msg = error.details.map((d) => d.message).join(", ");
            throw new ValidationError(msg);
        }
        req[source] = value;
        next();
    };
}
