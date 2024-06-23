<template>
  <div class="mb-3 flex items-center justify-between">
    <div class="flex items-center gap-2">
      <UIAvatar
        size="small"
        :src="avatar"
      />

      <div class="flex items-center gap-2">
        <span class="text-xs font-medium text-gray-900">{{ name }}</span>
        <span class="text-xs text-gray-700">{{ readableDate }}</span>
      </div>
    </div>

    <div class="relative">
      <button
        class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg"
        :class="{
          'bg-purple-800': activeOptions,
        }"
        @click="activeOptions = !activeOptions"
      >
        <svg
          class="h-4 w-4 stroke-blue-gray-300"
          :class="{
            'stroke-white': activeOptions,
          }"
        >
          <use xlink:href="@/assets/icons/sprites/btns.svg#dotted"></use>
        </svg>
      </button>

      <div
        class="absolute right-0 top-8 z-10 flex-col gap-1 rounded-lg bg-white p-3 shadow-xl"
        :class="{
          hidden: !activeOptions,
          flex: activeOptions,
        }"
      >
        <template v-if="isMyPost">
          <button
            class="rounded-md p-2 text-left text-sm font-medium text-blue-gray-500 hover:bg-blue-50"
            @click="$emit('delete-post')"
          >
            Удалить
          </button>
          <button
            class="rounded-md p-2 text-left text-sm font-medium text-blue-gray-500 hover:bg-blue-50"
            @click="$emit('edit-post')"
          >
            Редактировать
          </button>
        </template>
        <template v-else>
          <button class="rounded-md p-2 text-left text-sm font-medium text-blue-gray-500 hover:bg-blue-50">
            Поделиться
          </button>
          <button class="rounded-md p-2 text-left text-sm font-medium text-blue-gray-500 hover:bg-blue-50">
            Пожаловаться
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, ref, defineEmits } from 'vue';
import UIAvatar from '@/components/ui/UIAvatar.vue';
import { getTimeHasPassed } from '@/helpers/getTimeHasPassed';

interface IProps {
  date: string;
  name: string;
  avatar: string;
  isMyPost?: boolean;
}

interface IEmits {
  (e: 'delete-post'): void;
  (e: 'edit-post'): void;
}

const props = defineProps<IProps>();
defineEmits<IEmits>();

const activeOptions = ref(false);

const readableDate = computed(() => {
  return getTimeHasPassed(props.date);
});
</script>
