import { Request, Response } from "express";
import accountServices from "../services/AccountServices";

export const getAccountById = (req: Request, res: Response) => {
  const accountId: string = req.params.accountId;
  res.status(200).json({});
};

export const createNewAccount = async (req: Request, res: Response) => {
  const userId: number = Number(req.params.userId);
  const { balance = 0, dailyWithdrawlLimit = 0, accountType = 0 } = req.body;
  try {
    const newAccount = await accountServices.createNewAccount({
      userId,
      balance: Number(balance),
      dailyWithdrawlLimit: Number(dailyWithdrawlLimit),
      accountType: Number(accountType),
    });
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const updateAccountActiveFlag = (req: Request, res: Response) => {
  const { activeFlag = true } = req.body;
  res.status(201).json({});
};
