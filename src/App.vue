<template>
  <LayoutComponent>
    <RouterView />
  </LayoutComponent>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed } from 'vue';
import { RouterView, useRoute } from 'vue-router';

const AuthLayout = defineAsyncComponent(() => import('@/layouts/AuthLayout.vue'));
const EmptyLayout = defineAsyncComponent(() => import('@/layouts/EmptyLayout.vue'));
const MainLayout = defineAsyncComponent(() => import('@/layouts/MainLayout.vue'));

const route = useRoute();

const LayoutComponent = computed(() => {
  if (route.meta.layout === 'main') return MainLayout;
  if (route.meta.layout === 'auth') return AuthLayout;
  if (route.meta.layout === 'empty') return EmptyLayout;

  return MainLayout;
});
</script>

<style scoped></style>
