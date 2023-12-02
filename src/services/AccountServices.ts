import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../db";
import { Account } from "../entities/Account";

interface NewAccountData {
  userId: number;
  balance: number;
  dailyWithdrawlLimit: number;
  accountType: number;
}

interface FindAccountOptions {
  withTransactions?: boolean;
  versionLock?: boolean;
  searchByVersion?: number;
}

const accountRepository = AppDataSource.getRepository(Account);

const getAccounts = async (userId: number): Promise<Account[]> => {
  return await accountRepository.findBy({ userId });
};

const getAccountById = async (
  id: number,
  findAccountOptions: FindAccountOptions = {}
): Promise<Account | null> => {
  const {
    withTransactions = false,
    versionLock = false,
    searchByVersion,
  } = findAccountOptions;
  const query: FindOneOptions<Account> = {
    relations: { transactions: withTransactions },
  };
  const searchQuery: Record<string, unknown> = { id };

  if (versionLock)
    query.lock = {
      mode: "pessimistic_write",
      tables: ["account", "transaction"],
    };

  if (typeof searchByVersion === "number")
    searchQuery.version = searchByVersion;

  query.where = searchQuery;
  return await accountRepository.findOne(query);
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
