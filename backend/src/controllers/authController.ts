import { Request, Response } from "express";

export const login = (req: Request, res: Response) => res.json(req.body);
export const register = (req: Request, res: Response) => res.json(req.body);
