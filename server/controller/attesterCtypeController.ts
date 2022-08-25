import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import { ctypesList } from '../constants/ctypes';
import { AttesterCtype, IAttesterCtype } from '../schemas/attesterCtype';
import { z } from 'zod';
import { UserSchema } from './claimerController';

const CreateAttesterCtype = z.object({
  ctypeId: z.string(),
  quote: z.number(),
  terms: z.string()
});

const GetAttesterCtypeDetail = z.object({
  id: z.string()
});

const DeleteAttesterCtype = z.object({
  id: z.string(),
  user: UserSchema
});

/**
 * Creates a new attester ctype relationship in database.
 * @returns { data: IAttesterCtype }
 */
export const createAttesterCtype = async (
  req: Request,
  res: Response
) => {
  const parsedBody = CreateAttesterCtype.safeParse(req.body);
  const parsedUser = UserSchema.safeParse(req.params.user);

  if (!parsedUser.success) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized user'
    });
  }

  if (!parsedBody.success) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide valid ctypeId, quote and terms'
    });
  }
  const { didUri, web3name } = parsedUser.data;
  const { ctypeId, quote, terms } = parsedBody.data;

  const attester = attesterList.find(a => a === didUri);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  const ctype = ctypesList.find(c => c.schema.$id === ctypeId);
  if (!ctype) {
    return res.status(400).json({
      success: false,
      msg: 'You must provide a valid ctypeId'
    });
  }

  const ctypeName = ctype.schema.title;

  const attesterCtype = new AttesterCtype({
    web3name,
    didUri,
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
  const parsedUser = UserSchema.safeParse(req.params.user);

  if (!parsedUser.success) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized user'
    });
  }
  const { didUri } = parsedUser.data; 
  const attester = attesterList.find(a => a === didUri);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  const ctypes: IAttesterCtype[] = await AttesterCtype.find({
    attesterDidUri: didUri
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
  const parsedUser = UserSchema.safeParse(req.params.user);

  if (!parsedUser.success) {
    return res.status(401).json({
      success: false,
      msg: 'Unauthorized user'
    });
  }

  const attesterCtypes = await AttesterCtype.find();
  if (!attesterCtypes) {
    return res.status(400).json({
      success: false,
      msg: 'error connecting database'
    });
  }

  return res.status(200).json({
    success: true,
    data: attesterCtypes
  });
};

/**
 * Gets a single AttesterCtype by id.
 * @returns { success: boolean, data: AttesterCtype }
 */
export async function getAttesterCtypeDetail(req: Request, res: Response) {
  const parsed = GetAttesterCtypeDetail.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      msg: 'You must provide an id.'
    });
  }

  const{ id } = parsed.data; 
  const attesterCtype = await AttesterCtype.findById(id);
  const ctype = ctypesList.find(c => c.schema.$id === attesterCtype?.ctypeId);
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
    ctypeName: ctype.schema.title,
    ctypeId: attesterCtype.ctypeId,
    quote: attesterCtype.quote,
    terms: attesterCtype.terms,
    properties: ctype.schema.properties
  };
  return res.status(200).json({ success: true, data: attesterCtypeResponse });
}

/**
 * Deletes the provided ctype using the id.
 * @returns { success: boolean }
 */
export const deleteAttesterCtype = async (req: Request, res: Response) => {
  const parsed = DeleteAttesterCtype.safeParse(req.params);

  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      msg: 'Must provide a valid id'
    });
  }

  const { user, id } = parsed.data;
  const attester = attesterList.find(a => a === user.didUri);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  await AttesterCtype.findByIdAndDelete(id);
  return res.status(200).json({ success: true });
};
