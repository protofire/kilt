import { Row } from '../components/Table/Table';

export interface IAttester {
  did: string;
  name: string;
}

export interface IAttesterCtype {
  attesterDid: string;
  attesterName?: string;
  ctypeName?: string;
  quote?: number;
  terms?: string;
}

export const attesterCtypeToRow = (attesterCtype: IAttesterCtype) => ({
  id: attesterCtype.attesterDid,
  values: [
    { value: attesterCtype.attesterName },
    { value: attesterCtype.ctypeName },
    { value: attesterCtype.quote + ' KILT' }
  ]
}) as Row;
