import { Request, Response } from "express";

export const getAccountTransactions = (req: Request, res: Response) => {
  const accountId: string = req.params.accountId;
  res.status(200).json({});
};

export const createNewTransaction = (req: Request, res: Response) => {
  const { monetaryRequest } = req.body;
  res.status(201).json({});
};
