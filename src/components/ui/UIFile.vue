<template>
  <div class="flex items-center gap-2 rounded-lg border border-solid border-blue-gray-100 p-3.5">
    <div>
      <svg class="h-9 w-9">
        <use xlink:href="@/assets/icons/sprites/inputs.svg#file"></use>
      </svg>
    </div>
    <div>
      <p class="text-xs font-medium text-gray-900">{{ name }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface IProps {
  src: string;
  name: string;
}

defineProps<IProps>();
</script>

<style scoped></style>
