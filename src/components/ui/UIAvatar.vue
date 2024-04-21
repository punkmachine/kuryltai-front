<template>
  <img
    :src="src"
    class="h-9 w-9 rounded-full object-cover"
  />
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface IProps {
  src: string;
}

defineProps<IProps>();
</script>
