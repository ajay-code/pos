import { Router } from "express";
import * as authController from "../../controllers/authController";

const router = Router();

// local jwt implementation of login and registration
router.post("/login", authController.login);
router.post("/register", authController.register);

export default router;
