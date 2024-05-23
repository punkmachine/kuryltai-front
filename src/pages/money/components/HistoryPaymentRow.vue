<template>
  <div class="border-b border-solid border-gray-300 py-3">
    <div class="text-sm font-medium text-gray-900">{{ id }}</div>
    <div class="text-sm text-blue-gray-500">{{ sum }}</div>
    <div class="text-sm text-blue-gray-500">{{ date }}</div>
    <div
      class="text-sm"
      :class="{
        'text-amber-500': status === 1,
        'text-green-500': status === 2,
        'text-red-500': status === 3,
      }"
    >
      {{ readableStatus }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';

interface IProps {
  id: string;
  sum: string;
  date: string;
  status: 1 | 2 | 3;
}

const props = defineProps<IProps>();

const readableStatus = computed(() => {
  const dict = {
    1: 'Ожидает',
    2: 'Готово',
    3: 'Ошибка',
  };

  return dict[props.status];
});
</script>
