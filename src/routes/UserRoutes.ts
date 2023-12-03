import * as express from "express";

import { login, logout, register } from "../controllers/UserController";
import { authenticateToken } from "../middleware/authenticateToken";
import { RequestKeys, joiValidation } from "../middleware/joiValidation";
import { loginSchema, userSchema } from "../joi_schemas/User";

const router = express.Router();

router.post("/register", joiValidation(RequestKeys.Body)(userSchema), register);

router.post("/login", joiValidation(RequestKeys.Body)(loginSchema), login);

router.post("/logout", authenticateToken, logout);

export default router;
