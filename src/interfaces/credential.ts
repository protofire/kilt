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
