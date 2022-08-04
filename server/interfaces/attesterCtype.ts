import { DidUri } from "@kiltprotocol/sdk-js";

export interface IAttesterCtype {
  attesterDid: DidUri,
  ctypeName: string,
  quote: number,
  terms: string,
}