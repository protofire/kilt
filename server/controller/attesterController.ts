import { Request, Response } from 'express';
import { IAttesterCtype } from '../interfaces/attesterCtype';
import mongoose from 'mongoose';
import { attesterList } from '../constants/attesters';
import { ctypesList } from '../constants/ctypes';

const attesterCtypeSchema = new mongoose.Schema({
  attesterDid: String,
  ctypeName: String,
  ctypeId: String,
  quote: Number,
  terms: String
});
const AttesterCtype = mongoose.model('AttesterCtype', attesterCtypeSchema);

/**
 * Checks wheter the provided DiD is an attester or not.
 * @returns { data: { isAttester: boolean } }
 */
export const isAttester = (req: Request, res: Response) => {
  const { did } = req.params;
  const attester = attesterList.find(a => a === did);
  const isAttester = !!attester;
  return res.status(200).json({ data: { isAttester } });
};

/**
 * Creates a new attester ctype relationship in database.
 * @returns { data: IAttesterCtype }
 */
export const createCtype = async (req: Request, res: Response) => {
  const { attesterDid, ctypeId, quote, terms } = req.body;

  const attester = attesterList.find(a => a === attesterDid);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  const ctype = ctypesList.find(c => c.$id === ctypeId);
  if (!ctype) {
    return res.status(400).json({
      success: false,
      msg: 'You must provide a valid ctypeId'
    });
  }

  if (!quote || !terms) {
    return res.status(400).json({
      success: false,
      msg: 'You must provide quote and terms'
    });
  }

  const ctypeName = ctype.title;

  const attesterCtype = new AttesterCtype({
    attesterDid,
    ctypeName,
    ctypeId,
    quote,
    terms
  });
  const result = await attesterCtype.save();
  const created: IAttesterCtype = result.toJSON();
  return res.status(200).json({ success: true, data: created });
};

/**
 * Gets all the ctypes created by
 * @returns { data: IAttesterCtype[] }
 */
export const getAttesterCtypes = async (req: Request, res: Response) => {
  const { did } = req.params;

  if (!did) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide DiD parameter'
    });
  }

  const attester = attesterList.find(a => a === did);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  const ctypes: IAttesterCtype[] = await AttesterCtype.find({ attesterDid: did });
  return res.status(200).json({ data: ctypes ?? [] });
};

/**
 * Gets all the ctypes
 * @returns { data: ICTypeSchema[] }
 */
export const getCtypes = async (req: Request, res: Response) => {
  const { did } = req.params;

  const attester = attesterList.find(a => a === did);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  return res.status(200).json({ data: ctypesList });
};

/**
 * Deletes the provided ctype using the id.
 * @returns { success: boolean }
 */
export const deleteCtype = async (req: Request, res: Response) => {
  const { did, id } = req.params;

  const attester = attesterList.find(a => a === did);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  const ctype = ctypesList.find(c => c.$id === id);
  if (!ctype) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide a valid id parameter.'
    });
  }

  const result = await AttesterCtype.deleteOne({
    attesterDid: did,
    ctypeId: id
  });
  return res.status(200).json({ success: result.acknowledged });
};
