import { z } from 'zod';
import { didUriRegex } from '../../constants/regex';
import { UserSchema } from './user';

export const AttesterCtypeSchema = z.object({
  attesterDidUri: z.string().regex(didUriRegex),
  attesterWeb3name: z.string(),
  ctypeId: z.string(),
  ctypeName: z.string(),
  quote: z.number(),
  terms: z.string(),
  _id: z.string().optional(),
  properties: z.any(),
});

export const GetCredentialById = z.object({
  id: z.string(),
  user: UserSchema
});

export const CreateCredential = z.object({
  form: z.string(),
  attesterCtype: AttesterCtypeSchema
});
