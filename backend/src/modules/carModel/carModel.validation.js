import Joi from "joi";

export const carModelCreateSchema = Joi.object({
    brand: Joi.string().valid("Audi", "Jaguar", "Land Rover", "Renault").required(),
    class: Joi.string().valid("A", "B", "C").required(),
    modelName: Joi.string().required(),
    modelCode: Joi.string().alphanum().length(10).required(),
    description: Joi.string().required(),
    features: Joi.string().required(),
    price: Joi.number().positive().required(),
    dateOfManufacturing: Joi.date().iso().required(),
    active: Joi.boolean().default(true),
    sortOrder: Joi.number().integer().allow(null),
});

export const carModelQuerySchema = Joi.object({
    search: Joi.string().allow("", null),
    sortBy: Joi.string().valid("date", "sortOrder", "latest", "manufacturingDate").default("latest"),
});

export function convertTypes(req, res, next) {
    const booleanFields = ["active"];
    const numberFields = ["price", "sortOrder"];

    for (const key in req.body) {
        const value = req.body[key];

        // Convert boolean fields
        if (booleanFields.includes(key)) {
            req.body[key] = value === "true" || value === true;
            continue;
        }

        // Convert numeric fields
        if (numberFields.includes(key)) {
            req.body[key] = Number(value);
            continue;
        }

        // Leave everything else as string
    }

    next();
}
