<template>
  <div class="relative flex items-center gap-2 rounded-lg border border-solid border-blue-gray-100 p-3.5">
    <div>
      <svg class="h-9 w-9">
        <use xlink:href="@/assets/icons/sprites/inputs.svg#file"></use>
      </svg>
    </div>
    <div>
      <p class="text-xs font-medium text-gray-900">{{ name }}</p>
    </div>

    <button
      v-if="withDelete"
      @click="$emit('delete')"
      class="absolute right-2 top-2 fill-slate-300"
    >
      <svg class="h-6 w-6 rotate-45">
        <use xlink:href="@/assets/icons/sprites/btns.svg#add"></use>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

interface IProps {
  src: string;
  name: string;
  withDelete?: boolean;
}

interface IEmits {
  (e: 'delete'): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>

<style scoped></style>
