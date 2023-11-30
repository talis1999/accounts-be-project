import { AppDataSource } from "../db";
import { Account } from "../entities/Account";

interface NewAccountData {
  userId: number;
  balance: number;
  dailyWithdrawlLimit: number;
  accountType: number;
}

const getAccounts = async (): Promise<Account[]> => {
  return await AppDataSource.getRepository(Account).find({});
};

const getAccountById = async (id: number): Promise<Account | null> => {
  return await AppDataSource.getRepository(Account).findOneBy({
    id,
  });
};

const createNewAccount = async (
  accountData: NewAccountData
): Promise<Account> => {
  const newAccount = AppDataSource.getRepository(Account).create(accountData);
  return await AppDataSource.getRepository(Account).save(newAccount);
};

export default {
  getAccounts,
  getAccountById,
  createNewAccount,
};
