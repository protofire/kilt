import { Did, DidUri } from '@kiltprotocol/sdk-js';
import { Request, Response } from 'express';
import { attesterList } from '../constants/attesters';

export const formatDidUri = (did: DidUri) =>
  did.substring(0, 12) +
  '...' +
  did.substring(did.length - 5, did.length - 1);

/**
 * Checks wheter the provided DiD is an attester or not.
 * @returns { data: { isAttester: boolean } }
 */
export const getUserDetails = async (req: Request, res: Response) => {
  const { did } = req.params;
  const attester = attesterList.find(a => a === did);
  const isAttester = !!attester;

  const web3name = await Did.Web3Names
    .queryWeb3NameForDid(did as DidUri) ??
    formatDidUri(did as DidUri);

  return res.status(200).json({
    data: { isAttester, web3name }
  });
};
