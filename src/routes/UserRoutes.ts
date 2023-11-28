import express from "express";

import accountRoutes from "./AccountRoutes";
import { createNewUser, getUserById } from "../controllers/UserController";

const router = express.Router();

// Possible future changes - Add auth flow

router.use("/:userId/accounts", accountRoutes);

// GET user by id
router.get("/:userId", getUserById);

// POST user
router.post("/", createNewUser);

export default router;
