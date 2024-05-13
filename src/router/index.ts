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
      path: '/payments',
      name: 'payments',
      component: () => defineAsyncComponent(() => import('@/pages/payments/view.vue')),
      meta: {
        layout: 'main',
        requiresAuth: true,
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
      path: '/new-post',
      name: 'new-post',
      component: () => defineAsyncComponent(() => import('@/pages/new-post/view.vue')),
      meta: {
        layout: 'main',
        requiresAuth: true,
      },
    },
    {
      path: '/edit-post/:id',
      name: 'edit-post',
      component: () => defineAsyncComponent(() => import('@/pages/edit-post/view.vue')),
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
