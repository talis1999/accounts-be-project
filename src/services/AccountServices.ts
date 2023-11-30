import { AppDataSource } from "../db";
import { Account } from "../entities/Account";

interface NewAccountData {
  userId: number;
  balance: number;
  dailyWithdrawlLimit: number;
  accountType: number;
}

const getAccounts = async (userId: number): Promise<Account[]> => {
  return await AppDataSource.getRepository(Account).findBy({ userId });
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

const updateAccountsActiveFlag = async (
  userId: number,
  accountId: number,
  activeFlag: boolean
): Promise<Account | null> => {
  const account = await getAccountById(accountId);
  if (!account || account.userId !== userId) return null;

  return await AppDataSource.getRepository(Account).save({
    ...account,
    activeFlag,
  });
};

export default {
  getAccounts,
  getAccountById,
  createNewAccount,
  updateAccountsActiveFlag,
};
