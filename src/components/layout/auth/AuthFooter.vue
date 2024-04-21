<template>
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
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const currentYear = ref<number>(new Date().getFullYear());
</script>

<style scoped>
.auth-footer {
  @apply hidden h-16 w-full items-center justify-between text-sm text-blue-gray-500 lg:flex;
}

.auth-footer a {
  text-decoration: none;
}
</style>
