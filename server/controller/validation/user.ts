import { z } from 'zod';
import { didResourceUriRegex, didUriRegex } from '../../constants/regex';

export const UserSchema = z.object({
  isAttester: z.boolean(),
  web3name: z.string(),
  didUri: z.string().regex(didUriRegex),
});

export const VerifySignature = z.object({
  message: z.string(),
  ownerSignature: z.string(),
  didSignature: z.string(),
  keyUri: z.string().regex(didResourceUriRegex),
});

export const BuildMessage = z.object({
  encryptionKeyId: z.string().regex(didResourceUriRegex),
});

export const CheckToken = z.object({
  token: z.string(),
});