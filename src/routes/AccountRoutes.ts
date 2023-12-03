import * as express from "express";

import transactionRoutes from "./TransactionsRoutes";
import {
  getAccountById,
  createNewAccount,
  updateAccountActiveFlag,
  getAccounts,
} from "../controllers/AccountController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router({ mergeParams: true });

router.use("/:accountId/transactions", transactionRoutes);

// GET user accounts
router.get("/", authenticateToken, getAccounts);

// GET account by id
router.get("/:accountId", authenticateToken, getAccountById);

// POST account
router.post("/", authenticateToken, createNewAccount);

//  PATCH account - block/ unblock
router.patch("/:accountId", authenticateToken, updateAccountActiveFlag);

export default router;
