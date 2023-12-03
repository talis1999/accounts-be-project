import * as express from "express";

import transactionRoutes from "./TransactionsRoutes";
import {
  getAccountById,
  createNewAccount,
  updateAccountActiveFlag,
  getAccounts,
} from "../controllers/AccountController";
import { authenticateToken } from "../middleware/authenticateToken";
import { RequestKeys, joiValidation } from "../middleware/joiValidation";
import {
  updateAccountActiveFlagSchema,
  getAccountByIdSchema,
  accountSchema,
} from "../joi_schemas/Account";

const router = express.Router({ mergeParams: true });

router.use("/:accountId/transactions", transactionRoutes);

// GET user accounts
router.get("/", authenticateToken, getAccounts);

// GET account by id
router.get(
  "/:accountId",
  [joiValidation(RequestKeys.Query)(getAccountByIdSchema), authenticateToken],
  getAccountById
);

// POST account
router.post(
  "/",
  [joiValidation(RequestKeys.Body)(accountSchema), authenticateToken],
  createNewAccount
);

//  PATCH account - block/ unblock
router.patch(
  "/:accountId",
  [
    joiValidation(RequestKeys.Body)(updateAccountActiveFlagSchema),
    authenticateToken,
  ],
  updateAccountActiveFlag
);

export default router;
