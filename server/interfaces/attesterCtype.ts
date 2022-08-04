import { DidUri } from "@kiltprotocol/sdk-js";

export interface IAttesterCtype {
  attesterDid: DidUri,
  ctypeName: string,
  ctypeId: string,
  quote: number,
  terms: string,
}