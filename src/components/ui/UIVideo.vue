<template>
  <div class="overflow-hidden rounded-lg">
    <video
      :src="src"
      controls
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface IProps {
  src: string;
}

defineProps<IProps>();
</script>

<style scoped></style>
