export interface IAttester {
  did: string;
  name: string;
}

export interface IAttesterCtype {
  _id?: string;
  attesterDid: string;
  ctypeName?: string;
  ctypeId: string;
  quote?: number;
  terms?: string;
}
