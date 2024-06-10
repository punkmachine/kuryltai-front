import router from '@/router';
import { useMyProfileStore } from '@/store';

function fetchersProfile() {
  const store = useMyProfileStore();

  store.fetchMyCards();
  store.fetchMyProfile();
}

// eslint-disable-next-line max-lines-per-function
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    fetchersProfile();
    next();
  } else {
    next();
  }
});
