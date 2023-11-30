import { Request, Response } from "express";
import accountServices from "../services/AccountServices";

export const getAccounts = async (req: Request, res: Response) => {
  const userId: number = Number(req.params.userId);
  try {
    const accounts = await accountServices.getAccounts(userId);

    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getAccountById = async (req: Request, res: Response) => {
  const accountId: number = Number(req.params.accountId);

  try {
    const account = await accountServices.getAccountById(accountId);

    if (!account) {
      return res.status(404).json({ error: "account not found" });
    }

    res.status(200).json(account);
  } catch (error) {
    res.status(500).json({ error });
  }
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
