import * as Joi from "joi";

export const getTransactionsSchema = Joi.object({
  from: Joi.date(),
  to: Joi.date(),
});

export const transactionSchema = Joi.object({
  monetaryRequest: Joi.number().required(),
});
