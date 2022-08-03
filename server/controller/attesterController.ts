import express, { Request, Response } from "express";
import { attestersWhitelist } from "../constants";

export const isAttester = (req: Request, res: Response) => {
  const { did } = req.params;
  const attester = attestersWhitelist.find(a => a === did);
  const isAttester = !!attester;
  return res.status(200).json({ data: { isAttester } });
}