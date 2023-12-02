import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.authcookie;

  if (!token) return res.status(401).send("Invalid token");

  jwt.verify(token, "your_secret_key", (err: any, user: any) => {
    if (err) return res.status(401).send("Invalid token");

    req.user = user;
    next();
  });
};
