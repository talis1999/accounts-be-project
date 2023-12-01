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

export const createNewTransaction = async (req: Request, res: Response) => {
  const accountId: number = Number(req.params.accountId);
  const monetaryRequest: number = Number(req.body.monetaryRequest);

  try {
    const new_transaction = await transactionServices.createNewTransaction(
      accountId,
      monetaryRequest
    );
    res.status(201).json(new_transaction);
  } catch (error) {
    res.status(500).json({ error });
  }
};
