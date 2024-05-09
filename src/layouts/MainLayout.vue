<template>
  <div class="main-scope">
    <MainHeader />

    <main class="main-layout">
      <div class="main-layout__wrapper">
        <div class="main-sidebar">
          <MainSidebar />
        </div>

        <slot></slot>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import MainHeader from '@/components/layout/main/MainHeader.vue';
import MainSidebar from '@/components/layout/main/MainSidebar.vue';
</script>

<style scoped>
.main-scope {
  --header-height: 60px;
}

.main-layout {
  @apply flex justify-center bg-gray-200;

  margin-top: var(--header-height);
  min-height: calc(100vh - var(--header-height));
}

.main-layout__wrapper {
  @apply mt-6 grid gap-x-5;
  grid-template-columns: 292px 912px;
}

.main-sidebar {
  @apply w-[292px];
}

main {
  min-width: 100%;
}
</style>
