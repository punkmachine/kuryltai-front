import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/pages/profile/view.vue';

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
      component: () => defineAsyncComponent(() => import('@/pages/auth/view.vue')),
      meta: {
        layout: 'auth',
      },
    },
    {
      path: '/user/:slug',
      name: 'user',
      component: () => defineAsyncComponent(() => import('@/pages/user/view.vue')),
      meta: {
        layout: 'main',
      },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => defineAsyncComponent(() => import('@/pages/settings/view.vue')),
      meta: {
        layout: 'main',
        requiresAuth: true,
      },
    },
    {
      path: '/subscriptions',
      name: 'subscriptions',
      component: () => defineAsyncComponent(() => import('@/pages/subscriptions/view.vue')),
      meta: {
        layout: 'main',
        requiresAuth: true,
      },
    },
    {
      path: '/money',
      name: 'money',
      component: () => defineAsyncComponent(() => import('@/pages/money/view.vue')),
      meta: {
        layout: 'main',
        requiresAuth: true,
      },
    },
    {
      path: '/add-post',
      name: 'add-post',
      component: () => defineAsyncComponent(() => import('@/pages/add-post/view.vue')),
      meta: {
        layout: 'main',
        requiresAuth: true,
      },
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: () => defineAsyncComponent(() => import('@/pages/404/view.vue')),
      meta: {
        layout: 'empty',
      },
    },
  ],
});

export default router;
