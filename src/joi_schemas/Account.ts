import * as Joi from "joi";

export const accountByIdSchema = Joi.object({
  balanceOnly: Joi.boolean(),
});

export const accountSchema = Joi.object({
  balance: Joi.number().min(0),
  dailyWithdrawlLimit: Joi.number().min(0),
  accountType: Joi.number(),
});

export const accountActiveFlagSchema = Joi.object({
  activeFlag: Joi.boolean().required(),
});
