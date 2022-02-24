import * as Joi from 'joi';
export const envValidationSchema = Joi.object({
    CONNECTION_STRING: Joi.string().trim().required(),
    MONGO_URI: Joi.string().trim().required(),
    PORT: Joi.number().default(4005),
});
