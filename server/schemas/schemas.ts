import mongoose from 'mongoose';

const attesterCtypeSchema = new mongoose.Schema({
  attesterDid: String,
  ctypeName: String,
  ctypeId: String,
  quote: Number,
  terms: String
});
const AttesterCtype = mongoose.model('AttesterCtype', attesterCtypeSchema);

export { AttesterCtype }