import { Request, Response } from "express";
import { ICredentialByDidResponse } from "../interfaces/credentialEndpointResponse";
import { DidUri } from "@kiltprotocol/sdk-js";
import { buildCredential, getEndpointResponse, getEndpointsFromDid } from "../utils/claimUtils";

export async function getCredentialsByDid(req: Request, res: Response) {
  const { did } = req.params;

  if (!did) {
    return res.status(400).json({ 
      success: false, 
      msg: 'Must provide DiD parameter' 
    });
  }

  if (!did.startsWith('did:kilt:')) {
    return res.status(400).json({ 
      success: false, 
      msg: 'Wrong DiD format' 
    });
  }

  const endpoints = await getEndpointsFromDid(did as DidUri);
  if (!endpoints) {
    return res.status(200).json({ success: true, data: [] });
  }

  const endpointResponse = await getEndpointResponse(endpoints[0]);
  const credentials: ICredentialByDidResponse[] = await Promise
    .all(endpointResponse.map(buildCredential));

  return res.status(200).json({success: true, data: credentials});
}