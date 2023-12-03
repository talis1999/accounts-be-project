import * as express from "express";

import { login, logout, register } from "../controllers/UserController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authenticateToken, logout);

export default router;
