import * as express from "express";
import {
  createNewTransaction,
  getAccountTransactions,
} from "../controllers/TransactionsController";
import { authenticateToken } from "../middleware/authenticateToken";
import { RequestKeys, joiValidation } from "../middleware/joiValidation";
import {
  getTransactionsSchema,
  transactionSchema,
} from "../joi_schemas/Transaction";

const router = express.Router({ mergeParams: true });

// GET transactions by accountId
router.get(
  "/",
  [joiValidation(RequestKeys.Query)(getTransactionsSchema), authenticateToken],
  getAccountTransactions
);

// Create new transaction
router.post(
  "/",
  [joiValidation(RequestKeys.Body)(transactionSchema), authenticateToken],
  createNewTransaction
);

export default router;
