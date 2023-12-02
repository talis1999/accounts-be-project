import { Between } from "typeorm";
import { AppDataSource } from "../db";
import { Account } from "../entities/Account";
import { Transaction } from "../entities/Transaction";
import accountServices from "./AccountServices";
import { buildSearchQuery } from "../utils/TransactionUtils";

export const TRANSACTION_ERROR_PREFIX: string = "Invalid transaction--";

export interface DateRange {
  from?: Date;
  to?: Date;
}

interface TransactionErrorReport {
  isTransactionValid: boolean;
  reason?: string;
}

const accountRepository = AppDataSource.getRepository(Account);
const transactionRepository = AppDataSource.getRepository(Transaction);

const getTransactions = async (
  accountId: number,
  dateRange: DateRange = {}
): Promise<Transaction[]> => {
  return await transactionRepository.find({
    where: buildSearchQuery(accountId, dateRange),
  });
};

const getLastDayTotalTransaction = (
  transactions: Transaction[] = []
): number => {
  const dayAgo = new Date();
  dayAgo.setDate(dayAgo.getDate() - 1);

  return transactions
    .filter((transaction) => transaction.createdAt > dayAgo)
    .reduce((accumulator, transaction) => accumulator + transaction.value, 0);
};

// ! - In this check daily deposits may cancel out daily withdrawls for porpose of daily withdrawl limit check
const isDailyWithdrawlExceeded = (account: Account, value: number): boolean => {
  const lastDayTotalTransaction: number = getLastDayTotalTransaction(
    account.transactions
  );
  if (value >= 0) return false;
  return (lastDayTotalTransaction + value) * -1 > account.dailyWithdrawlLimit;
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
  const account = await accountServices.getAccountById(accountId, {
    withTransactions: true,
    versionLock: true,
  });
  if (!account) return null;

  const transactionErrorReport: TransactionErrorReport =
    reportTransactionErrors(account, value);

  if (!transactionErrorReport.isTransactionValid)
    throw new Error(
      `${TRANSACTION_ERROR_PREFIX} ${transactionErrorReport.reason}`
    );

  const accountUpdatePayload = await accountServices.getAccountById(accountId, {
    withTransactions: true,
    versionLock: true,
    searchByVersion: account.version,
  });

  if (!accountUpdatePayload)
    throw new Error("Transactions version error, please try again");

  accountUpdatePayload.balance = account.balance + value;

  await accountRepository.save(accountUpdatePayload);

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
