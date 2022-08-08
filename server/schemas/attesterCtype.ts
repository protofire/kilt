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

export { AttesterCtype };