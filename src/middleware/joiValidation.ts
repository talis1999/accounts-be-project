import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import * as _ from "lodash";

export const queryValidation =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.validate(req.query);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: validationResult.error?.details[0]?.message });
    }

    next();
  };

export const bodyValidation =
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: _.get(validationResult, "error.details[0].message") });
    }

    next();
  };
