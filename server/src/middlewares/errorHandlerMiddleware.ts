import { Request, Response } from "express";

export const errorHandler = (err: any, _: Request, res: Response) => {
  const status = err.statusCode || 500;
  const message = err.message || "Inrternal server error";

  res.status(status).json({
    code: status,
    message,
  });
};
