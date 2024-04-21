import { ref } from 'vue';
import { defineStore } from 'pinia';

const useAuthStore = defineStore('authStore', () => {
  const isAuth = ref(false);

  const setAuth = (bool: boolean) => (isAuth.value = bool);

  return {
    isAuth,
    setAuth,
  };
});

export default useAuthStore;
