import * as express from "express";

import transactionRoutes from "./TransactionsRoutes";
import {
  getAccountById,
  createNewAccount,
  updateAccountActiveFlag,
} from "../controllers/AccountController";

const router = express.Router();

router.use("/:accountId/transactions", transactionRoutes);

// GET account by id
router.get("/:accountId", getAccountById);

// POST account
router.post("/", createNewAccount);

//  PATCH account - block/ unblock
router.patch("/", updateAccountActiveFlag);

export default router;
