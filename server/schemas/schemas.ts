import mongoose from 'mongoose';

const attesterCtypeSchema = new mongoose.Schema({
  attesterDidUri: String,
  ctypeName: String,
  ctypeId: String,
  quote: Number,
  terms: String
});
const AttesterCtype = mongoose.model('AttesterCtype', attesterCtypeSchema);

export { AttesterCtype };
