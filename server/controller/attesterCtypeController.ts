import { Request, Response } from 'express';
import { attesterList } from "../constants/attesters";
import { ctypesList } from "../constants/ctypes";
import { IAttesterCtype } from '../interfaces/attesterCtype';
import { AttesterCtype } from '../schemas/attesterCtype';

/**
 * Creates a new attester ctype relationship in database.
 * @returns { data: IAttesterCtype }
 */
 export const createAttesterCtype = async (req: Request, res: Response) => {
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
}

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
    ...attesterCtype.toJSON(),
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