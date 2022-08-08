import { IRequestForAttestation } from '@kiltprotocol/sdk-js';
import mongoose from 'mongoose';

interface IAttesterCtype {
  attesterDidUri: string,
  ctypeName: string,
  ctypeId: string,
  quote: number,
  terms: string
}

const attesterCtypeSchema = new mongoose.Schema<IAttesterCtype>({
  attesterDidUri: String,
  ctypeName: String,
  ctypeId: String,
  quote: Number,
  terms: String
});
const AttesterCtype = mongoose.model('AttesterCtype', attesterCtypeSchema);

interface IClaimerRequest {
  request: IRequestForAttestation,
  ctypeId: string,
  claimerDid: string
}

const requestSchema = new mongoose.Schema<IClaimerRequest>({
  request: Object,
  ctypeId: String,
  claimerDid: String
});

const RequestAttestation = mongoose.model('RequestAttestation', requestSchema);

export { 
  AttesterCtype,
  RequestAttestation
};