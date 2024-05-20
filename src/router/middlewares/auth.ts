import router from '@/router';
import Cookies from 'js-cookie';

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Cookies.get('access')) {
      next({ name: 'auth' });
    } else {
      next();
    }
  } else {
    next();
  }
});
