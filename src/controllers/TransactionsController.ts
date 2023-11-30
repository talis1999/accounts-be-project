import { Request, Response } from "express";
import transactionServices from "../services/TransactionServices";

export const getAccountTransactions = async (req: Request, res: Response) => {
  const accountId: number = Number(req.params.accountId);
  try {
    const accounts = await transactionServices.getTransactions(
      accountId,
      undefined
    );
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const createNewTransaction = (req: Request, res: Response) => {
  const { monetaryRequest } = req.body;
  res.status(201).json({});
};
