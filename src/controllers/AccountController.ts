import { Request, Response } from "express";

export const getAccountById = (req: Request, res: Response) => {
  const accountId: string = req.params.accountId;
  res.status(200).json({});
};

export const createNewAccount = (req: Request, res: Response) => {
  const {} = req.body;
  res.status(201).json({});
};

export const updateAccountActiveFlag = (req: Request, res: Response) => {
  const { activeFlag = true } = req.body;
  res.status(201).json({});
};
