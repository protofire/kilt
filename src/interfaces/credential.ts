import { Status } from "../constants/claim-status";

export interface ICredential {
  id: number;
  attester: string;
  ctype: string;
  status: string;
  terms: string;
  claimerText: string;
  files: string[];
}