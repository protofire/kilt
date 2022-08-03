import { Request, Response } from "express";
import { ICredentialByDidResponse } from "../interfaces/credentialEndpointResponse";
import { DidUri } from "@kiltprotocol/sdk-js";
import { buildCredential, getEndpointResponse, getEndpointsFromDid } from "../utils/claimUtils";

export async function getCredentialsByDid(req: Request, res: Response) {
  const { did } = req.params;

  const endpoints = await getEndpointsFromDid(did as DidUri);
  if (!endpoints) {
    return res.status(200).json({ success: true, data: [] });
  }

  const endpointResponse = await getEndpointResponse(endpoints[0]);

  const credentials: ICredentialByDidResponse[] = await Promise.all(
    endpointResponse.map(buildCredential));

  return res.status(200).json({success: true, data: credentials});
  }