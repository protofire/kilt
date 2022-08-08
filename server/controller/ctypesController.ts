import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';
import { ctypesList } from '../constants/ctypes';

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