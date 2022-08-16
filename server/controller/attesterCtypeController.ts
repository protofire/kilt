import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import { ctypesList } from '../constants/ctypes';
import { AttesterCtype, IAttesterCtype } from '../schemas/attesterCtype';

/**
 * Creates a new attester ctype relationship in database.
 * @returns { data: IAttesterCtype }
 */
export const createAttesterCtype = async (req: Request, res: Response) => {
  const { attesterDidUri, attesterWeb3name, ctypeId, quote, terms } = req.body;

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
    attesterWeb3name,
    attesterDidUri,
    ctypeName,
    ctypeId,
    quote,
    terms
  });

  const created: IAttesterCtype = await attesterCtype.save();
  if (!created) {
    return res.status(400).json({
      success: false,
      msg: 'error connecting database'
    });
  }
  return res.status(200).json({ success: true, data: created });
};

/**
 * Gets all the ctypes created by
 * @returns { data: IAttesterCtype[] }
 */
export const getAttesterCtypesForAttester = async (
  req: Request,
  res: Response
) => {
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
 * Gets all the AttesterCtypes saved on database.
 * @returns { success: boolean, data: AttesterCtype[] }
 */
export const getAttesterCtypesForClaimer = async (
  req: Request,
  res: Response
) => {
  const { did } = req.params;

  if (!did || !did.startsWith('did:kilt:')) {
    return res.status(400).json({
      success: false,
      msg: 'You must provide a valid did.'
    });
  }

  const attesterCtypes = await AttesterCtype.find();
  if (!attesterCtypes) {
    return res.status(400).json({
      success: false,
      msg: 'error connecting database'
    });
  }

  return res.status(200).json({ success: true, data: attesterCtypes });
};

/**
 * Gets a single AttesterCtype by id.
 * @returns { success: boolean, data: AttesterCtype }
 */
export async function getAttesterCtypeDetail(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      msg: 'You must provide an id.'
    });
  }

  const attesterCtype = await AttesterCtype.findById(id);
  const ctype = ctypesList.find(c => c.$id === attesterCtype?.ctypeId);
  if (!attesterCtype || !ctype) {
    return res.status(404).json({
      success: false,
      msg: 'Attester Ctype not found.'
    });
  }

  // sets properties to fill by claimer
  const attesterCtypeResponse: IAttesterCtype = {
    _id: attesterCtype._id,
    attesterDidUri: attesterCtype.attesterDidUri,
    attesterWeb3name: attesterCtype.attesterWeb3name,
    ctypeName: ctype.title,
    ctypeId: attesterCtype.ctypeId,
    quote: attesterCtype.quote,
    terms: attesterCtype.terms,
    properties: ctype.properties
  };
  return res.status(200).json({ success: true, data: attesterCtypeResponse });
}

/**
 * Deletes the provided ctype using the id.
 * @returns { success: boolean }
 */
export const deleteAttesterCtype = async (req: Request, res: Response) => {
  const { did, id } = req.params;

  const attester = attesterList.find(a => a === did);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  await AttesterCtype.findByIdAndDelete(id);
  return res.status(200).json({ success: true });
};
