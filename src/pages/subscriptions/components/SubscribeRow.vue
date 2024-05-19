<template>
  <div class="table-grid border-b border-solid border-gray-300 py-3">
    <div class="flex items-center gap-4">
      <UIAvatar
        :src="avatar"
        size="small"
      />

      <div class="flex flex-col">
        <span class="text-sm font-medium text-gray-900">{{ userName }}</span>
        <span class="text-sm text-blue-gray-500">Отслеживание</span>
      </div>
    </div>

    <div class="flex items-center gap-2.5">
      <div
        class="h-1.5 w-1.5 rounded-full"
        :class="{
          'bg-green-500': status === 1,
          'bg-red-500': status === 2,
        }"
      />
      <p class="text-xs text-blue-gray-700">{{ status === 1 ? 'Активен' : 'Не активен' }}</p>
    </div>

    <div class="flex items-center">
      <p class="text-sm text-blue-gray-500">{{ readableDate }}</p>
    </div>

    <div class="flex items-center">
      <p class="text-sm text-blue-gray-500">{{ getFormatSum(sum) }}</p>
    </div>

    <div class="flex items-center justify-between">
      <button @click="$emit('open-settings')">
        <svg class="h-5 w-5">
          <use xlink:href="@/assets/icons/sprites/btns.svg#settings"></use>
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import dayjs from 'dayjs';
import UIAvatar from '@/components/ui/UIAvatar.vue';
import { getFormatSum } from '@/helpers/getFormatSum';

interface IProps {
  avatar: string;
  userName: string;
  status: 1 | 2;
  date: string;
  sum: string;
}

interface IEmits {
  (e: 'open-settings'): void;
}

const props = defineProps<IProps>();
defineEmits<IEmits>();

const readableDate = computed(() => {
  return dayjs(props.date).format('DD.MM.YYYY');
});
</script>
