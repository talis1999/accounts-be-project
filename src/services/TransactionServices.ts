import { Between } from "typeorm";
import { AppDataSource } from "../db";
import { Account } from "../entities/Account";
import { Transaction } from "../entities/Transaction";
import accountServices from "./AccountServices";

interface DateRange {
  from: Date;
  to: Date;
}

const accountRepository = AppDataSource.getRepository(Account);
const transactionRepository = AppDataSource.getRepository(Transaction);

const getTransactions = async (
  accountId: number,
  dateRange: DateRange | undefined
): Promise<Transaction[]> => {
  const searchQuery: Record<string, unknown> = { account: { id: accountId } };

  if (dateRange) searchQuery.createdAt = Between(dateRange.from, dateRange.to);

  return await transactionRepository.find({
    where: searchQuery,
  });
};

const getLastDayWithdrawl = (transactions: Transaction[] = []): number => {
  const dayAgo = new Date();
  dayAgo.setDate(dayAgo.getDate() - 1);

  return transactions
    .filter((transaction) => transaction.createdAt > dayAgo)
    .reduce((accumulator, transaction) => accumulator + transaction.value, 0);
};

const isDailyWithdrawlExceeded = (account: Account, value: number): boolean => {
  const lastDayWithdrawl: number = getLastDayWithdrawl(account.transactions);
  if (value >= 0) return false;
  return (lastDayWithdrawl + value) * -1 > account.dailyWithdrawlLimit;
};

const createNewTransaction = async (
  accountId: number,
  value: number
): Promise<Transaction | null | Error> => {
  const account = await accountServices.getAccountById(accountId, true);

  if (!account) return null;
  if (!account.activeFlag) return new Error("Invalid transaction");
  if (account.balance + value < 0) return new Error("Invalid transaction");
  if (value < 0 && getLastDayWithdrawl(account.transactions) + value)
    return new Error("Invalid transaction");
  if (isDailyWithdrawlExceeded(account, value))
    return new Error("Invalid transaction");

  // add here proper version control
  await accountRepository.save({
    ...account,
    balance: account.balance + value,
  });

  const newTransaction = transactionRepository.create({
    accountId,
    value,
  });

  return await transactionRepository.save(newTransaction);
};

export default {
  getTransactions,
  createNewTransaction,
};
