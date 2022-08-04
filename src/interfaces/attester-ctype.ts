import { Row } from '../components/Table/Table';
import { formatDid } from '../utils/string';

export interface IAttester {
  did: string;
  name: string;
}

export interface IAttesterCtype {
  attesterDid: string;
  ctypeName?: string;
  quote?: number;
  terms?: string;
}

export const attesterCtypeToRow = (attesterCtype: IAttesterCtype) => ({
  id: attesterCtype.attesterDid,
  values: [
    { value: formatDid(attesterCtype.attesterDid) },
    { value: attesterCtype.ctypeName },
    { value: attesterCtype.quote + ' KILT' }
  ]
}) as Row;
