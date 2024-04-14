<template>
  <div class="auth-layout">
    <div class="auth-layout__wrapper">
      <main>
        <slot></slot>
      </main>

      <footer class="auth-footer">
        <div>
          <p>Все права защищены © {{ currentYear }} Kuryltai</p>
        </div>
        <div class="flex items-center gap-7">
          <!-- @todo: router link -->
          <a href="#">Условия пользования</a>
          <a href="#">Политика конфиденциальности</a>
          <a href="#">Контакты</a>
        </div>
      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentYear = ref<number>(new Date().getFullYear());
</script>

<style scoped>
.auth-layout {
  @apply flex justify-center items-center h-screen max-h-screen;
}

.auth-layout__wrapper {
  @apply flex flex-col h-full max-w-7xl w-full;
}

main {
  flex: 1;
}

.auth-footer {
  @apply flex justify-between items-center h-16 w-full text-sm text-blue-gray-500;
}

.auth-footer a {
  text-decoration: none;
}
</style>
