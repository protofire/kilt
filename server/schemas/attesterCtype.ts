import mongoose, { ObjectId } from 'mongoose';

interface IAttesterCtype {
  _id: ObjectId,
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

export { AttesterCtype };
