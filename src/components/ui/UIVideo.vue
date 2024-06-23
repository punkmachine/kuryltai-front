<template>
  <div class="relative overflow-hidden rounded-lg">
    <video
      :src="src"
      controls
    />

    <button
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
  withDelete?: boolean;
}

interface IEmits {
  (e: 'delete'): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>

<style scoped></style>
