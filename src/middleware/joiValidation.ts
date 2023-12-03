import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";
import * as _ from "lodash";

export enum RequestKeys {
  Query = "query",
  Body = "body",
}

export const joiValidation =
  (key: RequestKeys) =>
  (schema: Joi.ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.validate(_.get(req, key));

    if (validationResult.error) {
      return res
        .status(400)
        .json({ error: _.get(validationResult, "error.details[0].message") });
    }

    next();
  };
