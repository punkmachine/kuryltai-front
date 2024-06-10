import { client } from '@/api/clients';
import { auth } from './modules/auth';
import { memberships } from './modules/memberships';
import { payments } from './modules/payments';
import { profile } from './modules/profile';

export const api = {
  auth: auth(client),
  memberships: memberships(client),
  payments: payments(client),
  profile: profile(client),
};
