import { AppDataSource } from "../db";
import { Account } from "../entities/Account";

interface NewAccountData {
  userId: number;
  balance: number;
  dailyWithdrawlLimit: number;
  accountType: number;
}

const accountRepository = AppDataSource.getRepository(Account);

const getAccounts = async (userId: number): Promise<Account[]> => {
  return await accountRepository.findBy({ userId });
};

const getAccountById = async (
  id: number,
  withTransactions: boolean = false
): Promise<Account | null> => {
  return await accountRepository.findOne({
    where: { id },
    relations: { transactions: withTransactions },
  });
};

const createNewAccount = async (
  accountData: NewAccountData
): Promise<Account> => {
  const newAccount = accountRepository.create(accountData);
  return await accountRepository.save(newAccount);
};

const updateAccountActiveFlag = async (
  userId: number,
  accountId: number,
  activeFlag: boolean
): Promise<Account | null> => {
  const account = await getAccountById(accountId);
  if (!account || account.userId !== userId) return null;

  return await accountRepository.save({
    ...account,
    activeFlag,
  });
};

export default {
  getAccounts,
  getAccountById,
  createNewAccount,
  updateAccountActiveFlag,
};
