import { IClaimContents, ICredential, IRequestForAttestation } from '@kiltprotocol/sdk-js';
import mongoose, { ObjectId } from 'mongoose';

export interface IClaimerCredential {
  _id?: ObjectId,
  credential?: ICredential,
  request?: IRequestForAttestation,
  ctypeId: string,
  claimerDid: string,
  status: string,
  ctypeName?: string,
  terms?: string,
  form?: IClaimContents,
}

const claimerCredentialSchema = new mongoose.Schema<IClaimerCredential>({
  credential: Object,
  request: Object,
  ctypeName: String,
  ctypeId: String,
  claimerDid: String,
  status: String,
  terms: String,
  form: Object
});
const ClaimerCredential = mongoose.model('ClaimerCredential', claimerCredentialSchema);

export { ClaimerCredential };
