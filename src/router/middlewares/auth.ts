import router from '@/router';
import Cookies from 'js-cookie';
import { authCookies } from '@/entities/constants/browserStoreKeys';

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Cookies.get(authCookies.access)) {
      next('/auth');
    } else {
      next();
    }
  } else {
    next();
  }
});
