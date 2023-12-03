import * as express from "express";

import { login, logout, register } from "../controllers/UserController";
import { authenticateToken } from "../middleware/authenticateToken";
import { bodyValidation } from "../middleware/joiValidation";
import { loginSchema, userSchema } from "../joi_schemas/User";

const router = express.Router();

router.post("/register", bodyValidation(userSchema), register);

router.post("/login", bodyValidation(loginSchema), login);

router.post("/logout", authenticateToken, logout);

export default router;
