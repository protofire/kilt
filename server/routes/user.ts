import express, { Request, Response } from "express";

import {
  clearCookie,
  setCookie,
  createJWT,
  getCookieData,
} from "../utilities/auth";
import { Did } from "@kiltprotocol/sdk-js";

export const userRouter = express.Router();

userRouter.get("/", async (req: Request, res: Response) => {
  // load and parse the cookie
  const cookie = req.headers.cookie || "";

  // get the user from cookie
  const user: any = getCookieData({ name: "token", cookie });

  if (!user) {
    // if null ensure cookie is cleared & 401cle
    clearCookie(res, { name: "token" });
    res.status(401).json({error: "User not found"});
  } else {
    // if user and renew reset the token
    const renew = process.env.JWT_RENEW;
    if (renew) {
      const newToken = createJWT(user);
      setCookie(res, { name: "token", data: newToken });
    }

    const web3Name = await Did.Web3Names.queryWeb3NameForDid(user);
    // send user and 200
    res.status(200).send(web3Name ? web3Name : user);
  }
});

export default async function handler(req: Request, res: Response) {}
