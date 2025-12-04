import Joi from "joi";

export const carModelCreateSchema = Joi.object({
    brand: Joi.string().valid("Audi", "Jaguar", "Land Rover", "Renault").required(),
    class: Joi.string().valid("A-Class", "B-Class", "C-Class").required(),
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
    sortBy: Joi.string().valid("date", "sortOrder", "latest").default("latest"),
});
