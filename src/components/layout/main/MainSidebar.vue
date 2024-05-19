<template>
  <aside>
    <RouterLink
      to="/"
      class="flex w-full items-center gap-1 px-3 py-2"
      :class="{
        'rounded-md bg-gray-50': activeLink === '',
      }"
    >
      <div>
        <svg class="h-4 w-4">
          <use xlink:href="@/assets/icons/sprites/menu.svg#profile"></use>
        </svg>
      </div>
      <span> Мой профиль </span>
    </RouterLink>

    <RouterLink
      to="/subscriptions"
      class="flex w-full items-center gap-1 px-3 py-2"
      :class="{
        'rounded-md bg-gray-50': activeLink === '/todo',
      }"
    >
      <div>
        <svg class="h-4 w-4">
          <use xlink:href="@/assets/icons/sprites/menu.svg#subscriptions"></use>
        </svg>
      </div>
      <span> Подписки </span>
    </RouterLink>

    <RouterLink
      to="/settings"
      class="flex w-full items-center gap-1 px-3 py-2"
      :class="{
        'rounded-md bg-gray-50': activeLink === '/settings',
      }"
    >
      <div>
        <svg class="h-4 w-4">
          <use xlink:href="@/assets/icons/sprites/menu.svg#settings"></use>
        </svg>
      </div>
      <span> Настройки </span>
    </RouterLink>
  </aside>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const activeLink = ref('');

watch(
  () => route.path,
  () => {
    activeLink.value = route.path;
  },
);
</script>

<style scoped>
aside {
  @apply flex flex-col items-start gap-1 rounded-lg bg-white px-3 py-6;

  box-shadow:
    0px 1px 3px 0px rgba(0, 0, 0, 0.1),
    0px 1px 2px -1px rgba(0, 0, 0, 0.1);
}
</style>
