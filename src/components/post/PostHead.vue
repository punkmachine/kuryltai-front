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

    <div class="flex h-6 w-6 items-center justify-center">
      <svg class="h-4 w-4">
        <use xlink:href="@/assets/icons/sprites/btns.svg#dotted"></use>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import UIAvatar from '@/components/ui/UIAvatar.vue';
import { getTimeHasPassed } from '@/helpers/getTimeHasPassed.ts';

interface IProps {
  date: string;
  name: string;
  avatar: string;
}

const props = defineProps<IProps>();

const readableDate = computed(() => {
  return getTimeHasPassed(props.date);
});
</script>

<style scoped></style>
