import router from '@/router';
import { useAuthStore } from '@/store';

router.beforeEach((to, from, next) => {
  const store = useAuthStore();

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.isAuth) {
      next({ name: 'auth' });
    } else {
      next();
    }
  } else {
    next();
  }
});
