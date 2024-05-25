import Cookies from 'js-cookie';
import router from '@/router';
import { authCookies } from '@/entities/constants/browserStoreKeys';

export function goToLogin() {
  router.push('/auth');
  Cookies.remove(authCookies.access);
  Cookies.remove(authCookies.refresh);
}
