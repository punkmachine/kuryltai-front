import router from '@/router';
import Cookies from 'js-cookie';
import { authCookies } from '@/entities/constants/browserStoreKeys';
import { useMyProfileStore } from '@/store';

function fetchersProfile() {
  const store = useMyProfileStore();

  store.fetchMyCards();
  store.fetchMyProfile();
}

// eslint-disable-next-line max-lines-per-function
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Cookies.get(authCookies.access)) {
      next('/auth');
    } else {
      fetchersProfile();
      next();
    }
  } else {
    fetchersProfile();
    next();
  }
});
