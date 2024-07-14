<template>
  <div class="main-scope">
    <MainHeader />

    <main class="main-layout">
      <div class="main-layout__wrapper">
        <div class="main-sidebar">
          <MainSidebar />
        </div>

        <div class="main-container">
          <slot></slot>
        </div>
      </div>
    </main>

    <div class="main-footer__wrapper">
      <AuthFooter class="main-footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainHeader from '@/components/layout/main/MainHeader.vue';
import MainSidebar from '@/components/layout/main/MainSidebar.vue';
import AuthFooter from '@/components/layout/auth/AuthFooter.vue';
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
  @apply mt-6 grid max-w-6xl gap-x-5;
}

.main-sidebar {
  @apply hidden w-full xl:block;
}

.main-container {
  @apply min-w-[864px] px-3 xl:p-0;
}

main {
  min-width: 100%;
}

.main-footer__wrapper {
  @apply flex justify-center bg-gray-200;
}

.main-footer {
  @apply max-w-6xl;
}

@media (min-width: 1280px) {
  .main-layout__wrapper {
    grid-template-columns: 25% 75%;
  }
}
</style>
