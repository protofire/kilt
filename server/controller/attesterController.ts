import { Request, Response } from 'express';
import { IAttesterCtype } from '../interfaces/attesterCtype';
import { attesterList } from '../constants/attesters';
import { ctypesList } from '../constants/ctypes';
import { AttesterCtype } from '../schemas/attesterCtype';
import { RequestAttestation } from '../schemas/requestAttestation';

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
  const { attesterDidUri, ctypeId, quote, terms } = req.body;

  const attester = attesterList.find(a => a === attesterDidUri);
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
    attesterDidUri,
    ctypeName,
    ctypeId,
    quote,
    terms
  });

  const result = await attesterCtype.save();
  if (!result) {
    return res.status(400).json({
      success: false,
      msg: 'error connecting database'
    });
  }

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
      msg: 'Must provide DiD Uri parameter'
    });
  }

  const attester = attesterList.find(a => a === did);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  const ctypes: IAttesterCtype[] = await AttesterCtype.find({
    attesterDidUri: did
  });
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
    attesterDidUri: did,
    ctypeId: id
  });
  return res.status(200).json({ success: result.acknowledged });
};

/**
 * List all the requests for attestation for the current attester.
 */
export const getRequests = async (req: Request, res: Response) => {
  const { did } = req.params;

  const attester = attesterList.find(a => a === did);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'Not a valid attester.'
    });
  }

  const ctypesToAttest = await AttesterCtype.find({
    attesterDidUri: did
  });

  const ctypeIds = ctypesToAttest.map(cta => cta.ctypeId);

  const requests = await RequestAttestation.find(
    { ctypeId: { "$in" : ctypeIds } });

  const data = requests.map(r => ({
    _id: r._id,
    claimerDidUri: r.claimerDid,
    ctypeName: r.ctypeId,
    status: r.status
  }));

  return res.status(200).json({ success: true, data });
};