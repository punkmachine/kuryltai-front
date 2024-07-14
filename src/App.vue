<template>
  <LayoutComponent>
    <RouterView />
  </LayoutComponent>
</template>

<script setup lang="ts">
import { defineAsyncComponent, computed, onMounted } from 'vue';
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

onMounted(() => {
  if (window.innerWidth < 1024) {
    document.querySelector('meta[name="viewport"]')?.setAttribute('content', 'width=1980');
  }
});
</script>

<style scoped></style>
