import { Row } from '../components/Table/Table';
import { statusToCeil } from '../constants/claim-status';
import { formatDid } from '../utils/string';

export interface FileURL {
  name: string;
  url: string;
}

export interface ICredential {
  id?: string;
  attesterName?: string;
  attesterDid: string;
  label: string;
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
    { value: credential.label },
    { value: formatDid(credential.attesterDid) },
    statusToCeil[credential.status]
  ]
}) as Row;
