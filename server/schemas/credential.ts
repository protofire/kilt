import { ICredential, IRequestForAttestation } from '@kiltprotocol/sdk-js';
import mongoose, { ObjectId, Types } from 'mongoose';

export interface IClaimerCredential {
  _id?: ObjectId,
  credential: ICredential,
  request: IRequestForAttestation,
  ctypeId: string,
  claimerDid: string,
  status: string
}

const claimerCredentialSchema = new mongoose.Schema<IClaimerCredential>({
  credential: Object,
  request: Object,
  ctypeId: String,
  claimerDid: String,
  status: String
});
const ClaimerCredential = mongoose.model('ClaimerCredential', claimerCredentialSchema);

export { ClaimerCredential };