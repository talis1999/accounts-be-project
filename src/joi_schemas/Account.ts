import * as Joi from "joi";

export const getAccountByIdSchema = Joi.object({
  balanceOnly: Joi.boolean(),
});

export const accountSchema = Joi.object({
  balance: Joi.number().min(0),
  dailyWithdrawlLimit: Joi.number().min(0),
  accountType: Joi.number(),
});

export const updateAccountActiveFlagSchema = Joi.object({
  activeFlag: Joi.boolean().required(),
});
