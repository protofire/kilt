import { Row } from '../components/Table/Table';
import { statusToCeil } from '../constants/claim-status';

export interface FileURL {
  name: string;
  url: string;
}

export interface ICredential {
  id: string;
  attesterName: string;
  attesterDid: string;
  ctypeName: string;
  status: string;
}

export interface IAttestedCredential {
  id: string;
  attesterName: string;
  attesterDid: string;
  ctypeName: string;
  claimerText: string;
  status: string;
  terms: string;
  files: FileURL[]
}

export const credentialToRow = (credential: ICredential) => ({
  id: credential.id,
  values: [
    { value: credential.ctypeName },
    { value: credential.attesterName },
    statusToCeil[credential.status]
  ]
}) as Row;
