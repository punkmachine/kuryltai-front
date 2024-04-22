<template>
  <div class="main-scope">
    <MainHeader />

    <main class="main-layout">
      <slot></slot>
    </main>
  </div>
</template>

<script lang="ts" setup>
import MainHeader from '@/components/layout/main/MainHeader.vue';
</script>

<style scoped>
.main-scope {
  --header-height: 60px;
}

.main-layout {
  @apply bg-gray-200;

  margin-top: var(--header-height);
  min-height: calc(100vh - var(--header-height));
}
</style>
