<template>
  <div class="flex items-center gap-4">
    <button
      class="flex items-center justify-center rounded-lg border border-solid border-blue-gray-50 p-2"
      :class="{
        'opacity-30': !prevPageActive
      }"
      :disabled="!prevPageActive"
      @click="$emit('prev-page')"
    >
      <svg class="h-5 w-5 rotate-90 fill-blue-gray-500">
        <use xlink:href="@/assets/icons/sprites/btns.svg#arrow"></use>
      </svg>
    </button>
    <div class="text-xs font-bold text-blue-gray-500">
      Стр. <span class="text-blue-gray-900">{{ currentPage }}</span> из
      <span class="text-blue-gray-900">{{ countPages }}</span>
    </div>
    <button
      class="flex items-center justify-center rounded-lg border border-solid border-blue-gray-50 p-2"
      :class="{
        'opacity-30': !nextPageActive
      }"
      :disabled="!nextPageActive"
      @click="$emit('next-page')"
    >
      <svg class="h-5 w-5 rotate-270 fill-blue-gray-900">
        <use xlink:href="@/assets/icons/sprites/btns.svg#arrow"></use>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';

interface IProps {
  currentPage: number;
  countPages: number;
}

interface IEmits {
  (e: 'next-page'): void;
  (e: 'prev-page'): void;
}

const props = defineProps<IProps>();
defineEmits<IEmits>();

const prevPageActive = computed(() => {
  return props.currentPage > 1;
});

const nextPageActive = computed(() => {
  return props.countPages > props.currentPage;
});
</script>

<style scoped></style>
