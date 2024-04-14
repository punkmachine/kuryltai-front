import { client } from '@/api/clients';
import { auth } from './modules/auth';

export const api = {
  auth: auth(client),
};
