import * as express from "express";

import accountRoutes from "./AccountRoutes";
import {
  //createNewUser,
  getUserById,
  getUsers,
  login,
  logout,
  register,
} from "../controllers/UserController";

const router = express.Router();

// Possible future changes - Add auth flow

router.use("/:userId/accounts", accountRoutes);

// GET all users
router.get("/", getUsers);

// GET user by id
router.get("/:userId", getUserById);

// POST user
// router.post("/", createNewUser);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;
