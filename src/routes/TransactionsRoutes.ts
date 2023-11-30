import * as express from "express";
import {
  createNewTransaction,
  getAccountTransactions,
} from "../controllers/TransactionsController";

const router = express.Router({ mergeParams: true });

// GET transactions by accountId
router.get("/", getAccountTransactions);

// Create new transaction
router.post("/", createNewTransaction);

export default router;
