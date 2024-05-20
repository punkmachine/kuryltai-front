<template>
  <section class="settings">
    <div class="settings__content">
      <keep-alive>
        <component :is="component" />
      </keep-alive>
    </div>

    <div class="settings__additional">
      <div
        class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2"
        :class="{
          'bg-blue-gray-50': settingState === 'account',
        }"
        @click="settingState = 'account'"
      >
        <svg class="h-4 w-4">
          <use xlink:href="@/assets/icons/sprites/menu.svg#account"></use>
        </svg>
        <span class="text-sm font-medium text-blue-gray-500">Аккаунт</span>
      </div>

      <div
        class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2"
        :class="{
          'bg-blue-gray-50': settingState === 'password',
        }"
        @click="settingState = 'password'"
      >
        <svg class="h-4 w-4">
          <use xlink:href="@/assets/icons/sprites/menu.svg#password"></use>
        </svg>
        <span class="text-sm font-medium text-blue-gray-500">Пароль</span>
      </div>

      <div
        class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2"
        :class="{
          'bg-blue-gray-50': settingState === 'payment',
        }"
        @click="settingState = 'payment'"
      >
        <svg class="h-4 w-4">
          <use xlink:href="@/assets/icons/sprites/menu.svg#payment"></use>
        </svg>
        <span class="text-sm font-medium text-blue-gray-500">Способ оплаты</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import AccountSettings from './components/AccountSettings.vue';
import PasswordSettings from './components/PasswordSettings.vue';
import PaymentSettings from './components/PaymentSettings.vue';

type TSettingState = 'account' | 'password' | 'payment';

const settingState = ref<TSettingState>('account');

const component = computed(() => {
  if (settingState.value === 'account') {
    return AccountSettings;
  } else if (settingState.value === 'password') {
    return PasswordSettings;
  } else {
    return PaymentSettings;
  }
});

watch(
  () => settingState.value,
  () => {
    localStorage.setItem('settings-state', settingState.value);
  },
);

onMounted(() => {
  if (localStorage.getItem('settings-state')) {
    settingState.value = localStorage.getItem('settings-state') as TSettingState;
  }
});

onBeforeUnmount(() => {
  localStorage.removeItem('settings-state');
});
</script>

<style scoped>
.settings {
  @apply grid gap-x-5;

  grid-template-columns: 2fr 1fr;
}

.settings__content {
  @apply w-[604px] rounded-lg bg-white px-6 py-3 shadow-standard;
}

.settings__additional {
  @apply flex h-max w-[292px] flex-col rounded-lg bg-white px-3 py-6 shadow-standard;
}
</style>
