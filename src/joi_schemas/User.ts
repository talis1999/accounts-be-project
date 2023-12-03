import * as Joi from "joi";

export const userSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().min(6).required(),
  document: Joi.string().allow("").required(),
  birthDay: Joi.date().required(),
});

export const loginSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string().min(6).required(),
});
