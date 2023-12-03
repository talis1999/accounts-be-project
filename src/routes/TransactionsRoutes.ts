import * as express from "express";
import {
  createNewTransaction,
  getAccountTransactions,
} from "../controllers/TransactionsController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router({ mergeParams: true });

// GET transactions by accountId
router.get("/", authenticateToken, getAccountTransactions);

// Create new transaction
router.post("/", authenticateToken, createNewTransaction);

export default router;
