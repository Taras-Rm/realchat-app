import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const response = {
      detail: errors
        .array()
        .map((err) => err.msg)
        .join(" | "),
    };

    res.status(400).json(response);
  };
};
