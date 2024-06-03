import { client } from '@/api/clients';
import { auth } from './modules/auth';
import { memberships } from './modules/memberships';

export const api = {
  auth: auth(client),
  memberships: memberships(client),
};
