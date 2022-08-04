import { Row } from '../components/Table/Table';

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

export const attesterCtypeToRow = (attesterCtype: IAttesterCtype) => ({
  id: attesterCtype.ctypeId,
  values: [
    { value: attesterCtype.ctypeName },
    { value: attesterCtype.quote + ' KILT' }
  ]
}) as Row;
