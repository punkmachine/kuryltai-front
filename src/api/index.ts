import { client } from '@/api/clients';
import { auth } from './modules/auth';
import { memberships } from './modules/memberships';
import { payments } from './modules/payments';
import { profile } from './modules/profile';
import { posts } from './modules/posts';

export const api = {
  auth: auth(client),
  memberships: memberships(client),
  payments: payments(client),
  profile: profile(client),
  posts: posts(client),
};
