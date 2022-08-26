import { z } from 'zod';
import { UserSchema } from './user';

export const CreateAttesterCtype = z.object({
  ctypeId: z.string(),
  quote: z.number(),
  terms: z.string()
});

export const GetAttesterCtypeDetail = z.object({
  id: z.string()
});

export const DeleteAttesterCtype = z.object({
  id: z.string(),
  user: UserSchema
});
