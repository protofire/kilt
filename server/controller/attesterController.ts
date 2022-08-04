import { Request, Response } from "express";
import { attestersWhitelist } from "../constants";
import { IAttesterCtype } from "../interfaces/attesterCtype";
import mongoose from 'mongoose';

const attesterCtypeSchema = new mongoose.Schema({
  attesterDid: String,
  ctypeName: String,
  quote: Number,
  terms: String,
});
const AttesterCtype = mongoose.model('AttesterCtype', attesterCtypeSchema);

/**
 * Checks wheter the provided DiD is an attester or not.
 * @returns { data: { isAttester: boolean } }
 */
export const isAttester = (req: Request, res: Response) => {
  const { did } = req.params;
  const attester = attestersWhitelist.find(a => a === did);
  const isAttester = !!attester;
  return res.status(200).json({ data: { isAttester } });
}

/**
 * Creates a new attester ctype relationship in database.
 * @returns { data: IAttesterCtype }
 */
export const createCtype = async (req: Request, res: Response) => {
  const { attesterDid, ctypeName, terms, quote } = req.body;

  const attester = attestersWhitelist.find(a => a === attesterDid);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    })
  }

  if (!ctypeName || !terms || !quote) {
    return res.status(400).json({
      success: false,
      msg: 'Incomplete query, you must add ctypeName, terms and quote.'
    })
  }

  const attesterCtype = new AttesterCtype({ attesterDid, ctypeName, terms, quote });
  const result = await attesterCtype.save();
  const created: IAttesterCtype = result.toJSON();
  return res.status(200).json({ success: true, data: created });
}


/**
 * Gets all the ctypes created by
 * @returns { data: IAttesterCtype[] }
 */
export const getCtypes = async (req: Request, res: Response) => {
  const { did } = req.params;

  if (!did) {
    return res.status(400).json({ 
      success: false, 
      msg: 'Must provide DiD parameter' 
    });
  }

  const attester = attestersWhitelist.find(a => a === did);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    })
  }

  const ctypes: IAttesterCtype[] = await AttesterCtype.find({attesterDid: did});
  return res.status(200).json({ data: ctypes ?? [] });
}

/**
 * Deletes the provided ctype using the id.
 * @returns { success: boolean }
 */
 export const deleteCtype = async (req: Request, res: Response) => {
  const { did, id } = req.params;

  if (!id) {
    return res.status(400).json({ 
      success: false, 
      msg: 'Must provide id parameter.' 
    });
  }

  const attester = attestersWhitelist.find(a => a === did);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    })
  }

  const result = await AttesterCtype.deleteOne({
    attesterDid: did,
    _id: new mongoose.Types.ObjectId(id)
  });
  return res.status(200).json({ success: result.acknowledged });
}