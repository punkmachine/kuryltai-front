<template>
  <header class="header">
    <div class="header__content">
      <div class="mb-1 h-8 w-[122px] cursor-pointer">
        <img
          src="@/assets/icons/logo.svg"
          alt=""
        />
      </div>

      <!-- <div>
        <UIInput
          v-model="search"
          placeholder="Поиск"
          class="w-96"
        />
      </div> -->

      <div
        class="relative cursor-pointer"
        @click="showProfileDropdown"
      >
        <div class="flex items-center gap-1.5">
          <UIAvatar
            size="medium"
            src="https://avatars.githubusercontent.com/u/76869388?v=4"
          />

          <span class="text-sm font-medium text-gray-600">Алекс</span>

          <div>
            <svg class="h-5 w-5 fill-blue-gray-500">
              <use xlink:href="@/assets/icons/sprites/btns.svg#arrow"></use>
            </svg>
          </div>
        </div>

        <div
          class="header__dropdown"
          :class="{
            'header__dropdown--active': visibleDropdown,
          }"
        >
          <RouterLink
            to="/money"
            class="header__dropdown-item"
            >Денюжки</RouterLink
          >
          <button
            class="header__dropdown-item text-left"
            @click="logout"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import UIInput from '@/components/ui/UIInput.vue';
import UIAvatar from '@/components/ui/UIAvatar.vue';
import { goToLogin } from '@/helpers/goToLoginPage';

const search = ref<string>('');
const visibleDropdown = ref<boolean>(false);

function showProfileDropdown() {
  visibleDropdown.value = !visibleDropdown.value;
}

function logout() {
  goToLogin();
}
</script>

<style scoped>
.header {
  @apply fixed top-0 z-10 flex w-full justify-center bg-white;

  height: var(--header-height);
}

.header__content {
  @apply flex w-full items-center justify-between px-3 py-3 xl:max-w-7xl xl:px-0;
}

.header__dropdown {
  @apply absolute bottom-[-106px] right-0 z-30 hidden min-w-32 flex-col rounded-lg bg-white p-2;
}

.header__dropdown--active {
  @apply flex;
}

.header__dropdown-item {
  @apply rounded-md p-2 px-4 text-sm font-medium text-blue-gray-500 transition-colors hover:bg-blue-gray-50;
}
</style>
