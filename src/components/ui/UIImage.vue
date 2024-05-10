<template>
  <div class="overflow-hidden rounded-lg">
    <img
      :src="src"
      :alt="alt ?? ''"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface IProps {
  src: string;
  alt?: string;
}

defineProps<IProps>();
</script>

<style scoped></style>
