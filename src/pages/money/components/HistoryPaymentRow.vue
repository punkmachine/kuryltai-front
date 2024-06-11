<template>
  <div class="border-b border-solid border-gray-300 py-3">
    <div class="text-sm font-medium text-gray-900">{{ id }}</div>
    <div class="text-sm text-blue-gray-500">{{ sum }}</div>
    <div class="text-sm text-blue-gray-500">{{ date }}</div>
    <div
      class="text-sm"
      :class="{
        'text-amber-500': status === 'Wait_completed',
        'text-green-500': status === 'Completed',
        'text-red-500': status === 'Declined',
      }"
    >
      {{ readableStatus }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

interface IProps {
  id: number | string;
  sum: string;
  date: string;
  status: 'Wait_completed' | 'Completed' | 'Declined';
}

const props = defineProps<IProps>();

const readableStatus = computed(() => {
  const dict = {
    Wait_completed: 'Ожидает',
    Completed: 'Готово',
    Declined: 'Ошибка',
  };

  return dict[props.status];
});
</script>
