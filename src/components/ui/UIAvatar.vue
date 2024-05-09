<template>
  <img
    :src="src"
    :class="['rounded-full object-cover', size]"
  />
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';

interface IProps {
  src: string;
  size: 'small' | 'medium' | 'big';
}

const props = defineProps<IProps>();

const size = computed(() => {
  const dict = {
    small: 'h-6 w-6',
    medium: 'h-9 w-9',
    big: 'h-44 w-44',
  };

  return dict[props.size];
});
</script>
