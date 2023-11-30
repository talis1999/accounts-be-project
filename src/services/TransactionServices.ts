import { Between } from "typeorm";
import { AppDataSource } from "../db";
import { Transaction } from "../entities/Transaction";

interface DateRange {
  from: Date;
  to: Date;
}

const getTransactions = async (
  accountId: number,
  dateRange: DateRange | undefined
): Promise<Transaction[]> => {
  const searchQuery: Record<string, unknown> = { account: { id: accountId } };

  if (dateRange) searchQuery.createdAt = Between(dateRange.from, dateRange.to);

  return await AppDataSource.getRepository(Transaction).find({
    where: searchQuery,
  });
};

// const getUserById = async (id: number): Promise<User | null> => {
//   return await AppDataSource.getRepository(User).findOneBy({
//     id,
//   });
// };

// const createNewUser = async (userData: NewUserData): Promise<User> => {
//   const newPerson = AppDataSource.getRepository(User).create(userData);
//   return await AppDataSource.getRepository(User).save(newPerson);
// };

export default {
  getTransactions,
  //   getUserById,
  //   createNewUser,
};
