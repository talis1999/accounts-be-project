import { Request, Response } from "express";
import accountServices from "../services/AccountServices";
import transactionServices, {
  DateRange,
  TRANSACTION_ERROR_PREFIX,
} from "../services/TransactionServices";

export const getAccountTransactions = async (req: Request, res: Response) => {
  const userId: number = req.userId;
  const accountId: number = Number(req.params.accountId);
  const { from, to } = req.query;
  try {
    const dateRange: DateRange = {
      from: typeof from === "string" ? new Date(from) : from,
      to: typeof to === "string" ? new Date(to) : to,
    };

    const account = await accountServices.getAccountById(accountId);
    if (!account || account.userId !== userId)
      return res.status(404).json({ message: "Account not found" });

    const transactions = await transactionServices.getTransactions(
      accountId,
      dateRange
    );
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNewTransaction = async (req: Request, res: Response) => {
  const userId: number = req.userId;
  const accountId: number = Number(req.params.accountId);
  // if positive - deposit, negative - withdrawl
  const monetaryRequest: number = Number(req.body.monetaryRequest);

  try {
    const newTransaction = await transactionServices.createNewTransaction({
      userId,
      accountId,
      value: monetaryRequest,
      retryOptions: { retries: 3 },
    });

    if (!newTransaction)
      return res.status(404).json({ message: "Account not found" });

    res.status(201).json(newTransaction);
  } catch (error) {
    if (error.message.includes(TRANSACTION_ERROR_PREFIX))
      return res.status(400).json({ error: error.message });
    res.status(500).json({ error: error.message });
  }
};
