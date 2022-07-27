import express, { Request, Response } from "express";
import { getCookieData } from "../utilities/auth";

export const secretRouter = express.Router();

secretRouter.get("/", (req: Request, res: Response) => {
  // get the user from http-only cookie
  const cookie = `token=${req.cookies.token}`;
  const user = getCookieData({ name: "token", cookie });

  // deny if not logged in
  if (!user) return res.status(401).json({ error: "Unauthorized access" });
  res.status(200).json({ succes: "Authorized access granted" });
});
