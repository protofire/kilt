import { z } from 'zod';
import { UserSchema } from './user';

export const GetRequestDetail = z.object({
  id: z.string(),
  user: UserSchema
});

export const VerifyRequest = z.object({
  id: z.string(),
  user: UserSchema
});

export const ConfirmRequest = z.object({
  id: z.string(),
  user: UserSchema
});
