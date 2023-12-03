import * as express from "express";

import accountRoutes from "./AccountRoutes";
import { login, logout, register } from "../controllers/UserController";

const router = express.Router();

router.use("/:userId/accounts", accountRoutes);

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

export default router;
