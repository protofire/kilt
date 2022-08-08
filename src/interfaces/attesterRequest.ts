import { DidUri } from "@kiltprotocol/sdk-js";

export interface IAttesterRequest {
  _id: string,
  claimerDidUri: DidUri,
  ctypeName: string,
  status: string
}
