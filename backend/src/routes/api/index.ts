import { Request, Response, Router } from "express";
import authRouter from "./auth";
import userRouter from "./user";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.json({
    msg: "express api",
  });
});

router.use(authRouter);
router.use(userRouter);

export default router;
