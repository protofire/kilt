import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import { ctypesList } from '../constants/ctypes';
import { UserSchema } from './validation/user';

/**
 * Gets all the ctypes
 * @returns { data: ICTypeSchema[] }
 */
export const getCtypes = async (
  req: Request,
  res: Response
) => {
  const parsed = UserSchema.safeParse(req.params.user);

  if (!parsed.success) {
    return res.status(401).json({
      msg: 'Unauthorized user',
      success: false
    });
  }

  const { didUri } = parsed.data;
  const attester = attesterList.find(a => a === didUri);
  if (!attester) {
    return res.status(400).json({
      success: false,
      msg: 'not a valid attester.'
    });
  }

  return res.status(200).json({ data: ctypesList });
};
