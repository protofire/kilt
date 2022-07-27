import express, { Request, Response } from "express";
import { clearCookie } from "../utilities/auth";

export const logoutRouter = express.Router();

logoutRouter.get("/", (req: Request, res: Response) => {
  // clear the cookie return 200
  clearCookie(res, { name: "token" });
  res.status(200).json({ success: "User successfully loged out" });
});
