import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/profile/view.vue';
import AuthPage from '@/pages/auth/view.vue';

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
      meta: {
        layout: 'main',
        requiresAuth: true,
      },
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
      meta: {
        layout: 'auth',
      },
    },
    {
      path: '/user/:slug',
      name: 'user',
      component: () => import('@/pages/user/view.vue'),
      meta: {
        layout: 'main',
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/pages/settings/view.vue'),
      meta: {
        layout: 'main',
        requiresAuth: true,
      },
    },
    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: () => import('@/pages/subscriptions/view.vue'),
      meta: {
        layout: 'main',
        requiresAuth: true,
      },
    },
    {
      path: '/money',
      name: 'money',
      component: () => import('@/pages/money/view.vue'),
      meta: {
        layout: 'main',
        requiresAuth: true,
      },
    },
    {
      path: '/add-post',
      name: 'add-post',
      component: () => import('@/pages/add-post/view.vue'),
      meta: {
        layout: 'main',
        requiresAuth: true,
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('@/pages/404/view.vue'),
      meta: {
        layout: 'empty',
      },
    },
  ],
});

export default router;
