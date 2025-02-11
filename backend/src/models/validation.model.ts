import Joi from "joi";

export const registerValidator = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required(),
});

export const loginValidator = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "in"] } })
    .required(),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .min(8)
    .required(),
});
