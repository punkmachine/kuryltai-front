<template>
  <header class="header">
    <div class="header__content">
      <div class="mb-1 h-8 w-[122px] cursor-pointer">
        <img
          src="@/assets/icons/logo.svg"
          alt=""
        />
      </div>

      <div>
        <UIInput
          v-model="search"
          placeholder="Поиск"
          class="w-96"
        />
      </div>

      <div class="cursor-pointer">
        <div class="flex items-center gap-1.5">
          <UIAvatar
            size="medium"
            src="https://avatars.githubusercontent.com/u/76869388?v=4"
          />

          <span class="text-sm font-medium text-gray-600">Алекс</span>

          <div>
            <svg class="h-5 w-5">
              <use xlink:href="@/assets/icons/sprites/btns.svg#arrow"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';
import UIAvatar from '@/components/ui/UIAvatar.vue';

const search = ref<string>('');
</script>

<style scoped>
.header {
  @apply fixed top-0 z-10 flex w-full justify-center bg-white;

  height: var(--header-height);
}

.header__content {
  @apply flex w-full max-w-7xl items-center justify-between py-3;
}
</style>
