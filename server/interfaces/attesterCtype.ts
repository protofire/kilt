import { DidUri } from "@kiltprotocol/sdk-js";

export interface IAttesterCtype {
  _id: string,
  attesterDid: DidUri,
  ctypeName: string,
  quote: number,
  terms: string,
}