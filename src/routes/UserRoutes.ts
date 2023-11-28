import express from "express";

import accountRoutes from "./AccountRoutes";
import { createNewUser, getUserById } from "../controllers/UserController";

const router = express.Router();

// Possible future changes -
// 1. Change - persons -> users
// 2. Add as auth flow

router.use("/:personId/accounts", accountRoutes);

// GET person by id
router.get("/:personId", getUserById);

// POST person
router.post("/", createNewUser);

export default router;
