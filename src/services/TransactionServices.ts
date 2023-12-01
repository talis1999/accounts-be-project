import { Between } from "typeorm";
import { AppDataSource } from "../db";
import { Account } from "../entities/Account";
import { Transaction } from "../entities/Transaction";
import accountServices from "./AccountServices";

export const TRANSACTION_ERROR_PREFIX: string = "Invalid transaction--";

interface DateRange {
  from: Date;
  to: Date;
}

interface TransactionErrorReport {
  isTransactionValid: boolean;
  reason?: string;
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

const reportTransactionErrors = (
  account: Account,
  value: number
): TransactionErrorReport => {
  if (!account.activeFlag)
    return { isTransactionValid: false, reason: "blocked account" };
  if (account.balance + value < 0)
    return { isTransactionValid: false, reason: "withdrawl exceeding balance" };
  if (isDailyWithdrawlExceeded(account, value))
    return {
      isTransactionValid: false,
      reason: "withdrawl exceeding the daily limit",
    };

  return { isTransactionValid: true };
};

const createNewTransaction = async (
  accountId: number,
  value: number
): Promise<Transaction | null> => {
  const account = await accountServices.getAccountById(accountId, true);
  if (!account) return null;

  const transactionErrorReport: TransactionErrorReport =
    reportTransactionErrors(account, value);

  if (!transactionErrorReport.isTransactionValid)
    throw new Error(
      `${TRANSACTION_ERROR_PREFIX} ${transactionErrorReport.reason}`
    );

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
