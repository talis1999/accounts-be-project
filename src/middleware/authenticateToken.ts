import "dotenv/config";
import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.cookies.authToken;

  if (!token) return res.status(401).send("Invalid token");

  jwt.verify(
    token,
    process.env.JWT_SECRET || "",
    (err: jwt.VerifyErrors, data: jwt.JwtPayload) => {
      if (err) return res.status(401).send("Invalid token");

      req.userId = data.userId;
      next();
    }
  );
};
