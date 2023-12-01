import {
  LessThanOrEqual,
  MoreThanOrEqual,
  Between,
  FindOperator,
} from "typeorm";
import { DateRange } from "../services/TransactionServices";

const buildDateRangeField = (
  dateRange: DateRange = {}
): FindOperator<Date> | undefined => {
  if (dateRange.from && dateRange.to)
    return Between(dateRange.from, dateRange.to);
  if (dateRange.from) return MoreThanOrEqual(dateRange.from);
  if (dateRange.to) return LessThanOrEqual(dateRange.to);

  return;
};

export const buildSearchQuery = (
  accountId: number,
  dateRange: DateRange = {}
): Record<string, unknown> => {
  const searchQuery: Record<string, unknown> = { account: { id: accountId } };
  const dateRangeField: FindOperator<Date> | undefined =
    buildDateRangeField(dateRange);
  if (dateRangeField) searchQuery.createdAt = buildDateRangeField(dateRange);

  return searchQuery;
};
