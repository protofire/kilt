import { IRequestForAttestation } from '@kiltprotocol/sdk-js';
import mongoose from 'mongoose';

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
  RequestAttestation
};