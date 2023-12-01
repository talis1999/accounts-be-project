import { Between } from "typeorm";
import { DateRange } from "../services/TransactionServices";

export const buildSearchQuery = (
  accountId: number,
  dateRange: DateRange = {}
): Record<string, unknown> => {
  const searchQuery: Record<string, unknown> = { account: { id: accountId } };
  // Starting from version 0.3.0, Between supports undefined values. If one of the values is undefined, it will be treated as an open range in the corresponding direction
  if (dateRange.from || dateRange.to)
    searchQuery.createdAt = Between(dateRange.from, dateRange.to);

  return searchQuery;
};
