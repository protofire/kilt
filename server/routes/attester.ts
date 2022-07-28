import express, { Request, Response } from "express";
import { generateAccount } from "../utilities/helper";

export const attesterRouter = express.Router();

attesterRouter.post("/", async (req: Request, res: Response) => {
  // console.log("here");
  try {
    // load this to DB and encrypt mnemonic
    const { account, mnemonic } = await generateAccount();
    
    res.status(200).json({ user: account.address , account: account});
  } catch (e) {
    throw new Error("Account can't be created at this time ");
  }
});
