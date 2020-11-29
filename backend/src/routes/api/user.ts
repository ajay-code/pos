import { Router } from "express";
import passport from "passport";
import * as userController from "../../controllers/userController";

const router = Router();
const jwtAuth = passport.authenticate("jwt", { session: false });

router.get("/user", jwtAuth, userController.getUser);

export default router;
