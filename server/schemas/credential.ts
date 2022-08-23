import { IClaimContents, ICredential, IRequestForAttestation } from '@kiltprotocol/sdk-js';
import mongoose, { ObjectId } from 'mongoose';

export interface IClaimerCredential {
  _id?: ObjectId,
  credential?: ICredential,
  request?: IRequestForAttestation,
  ctypeId: string,
  claimerDid: string,
  claimerWeb3name: string,
  attesterDid: string,
  attesterWeb3name: string,
  status: string,
  ctypeName?: string,
  terms?: string,
  form?: IClaimContents,
  quote: number,
}

const claimerCredentialSchema = new mongoose.Schema<IClaimerCredential>({
  credential: Object,
  request: Object,
  ctypeName: String,
  ctypeId: String,
  claimerDid: String,
  claimerWeb3name: String,
  attesterDid: String,
  attesterWeb3name: String,
  status: String,
  terms: String,
  form: Object,
  quote: Number,
});
const ClaimerCredential = mongoose.model('ClaimerCredential', claimerCredentialSchema);

export { ClaimerCredential };
