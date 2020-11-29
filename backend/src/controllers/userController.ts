import { Request, Response } from "express";

export const getUser = (req: Request, res: Response) => {
  const user: any = req.user;
  res.json({
    name: user.name,
    email: user.email,
    role: user.role,
  });
};
