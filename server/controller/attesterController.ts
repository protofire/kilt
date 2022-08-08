import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';

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
