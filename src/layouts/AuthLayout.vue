<template>
  <div class="auth-layout">
    <div class="auth-layout__wrapper">
      <main>
        <slot></slot>
      </main>

      <AuthFooter />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AuthFooter from '@/components/layout/auth/AuthFooter.vue';
</script>

<style scoped>
.auth-layout {
  @apply flex h-screen max-h-screen items-center justify-center;
}

.auth-layout__wrapper {
  @apply flex h-full w-full max-w-7xl flex-col;
}

main {
  flex: 1;
}
</style>
