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
      path: '/privacy',
      name: 'privacy',
      component: () => import('@/pages/docs/privacy-policy/view.vue'),
      meta: {
        layout: 'empty',
        requiresAuth: false,
      },
    },
    {
      path: '/terms-use',
      name: 'terms-use',
      component: () => import('@/pages/docs/terms-use/view.vue'),
      meta: {
        layout: 'empty',
        requiresAuth: false,
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => import('@/pages/404/view.vue'),
      meta: {
        layout: 'empty',
        requiresAuth: false,
      },
    },
  ],
});

export default router;
