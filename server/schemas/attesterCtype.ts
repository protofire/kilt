import mongoose, { ObjectId } from 'mongoose';
import { InstanceType } from '@kiltprotocol/sdk-js';

interface IPropertyMap {
  [name: string]: {
    $ref?: string | undefined;
    type?: InstanceType | undefined;
    format?: string | undefined;
  }
}

export interface IAttesterCtype {
  _id?: ObjectId,
  attesterDidUri: string,
  ctypeName: string,
  ctypeId: string,
  quote: number,
  terms: string,
  properties?: Readonly<IPropertyMap>
}

const attesterCtypeSchema = new mongoose.Schema<IAttesterCtype>({
  attesterDidUri: String,
  ctypeName: String,
  ctypeId: String,
  quote: Number,
  terms: String,
  properties: Object
});
const AttesterCtype = mongoose.model('AttesterCtype', attesterCtypeSchema);

export { AttesterCtype };
