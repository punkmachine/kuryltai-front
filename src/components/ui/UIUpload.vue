<template>
  <button class="upload">
    <svg>
      <use :xlink:href="`${icons}#${iconUpload}`"></use>
    </svg>
    <span>{{ labelUpload }}</span>

    <input
      class="absolute bottom-0 left-0 right-0 top-0 z-50 opacity-0"
      type="file"
      :accept="fileType"
    />
  </button>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue';
import icons from '@/assets/icons/sprites/inputs.svg';

interface IProps {
  label?: string;
  icon?: string;
  fileType: string;
}

const props = defineProps<IProps>();

const iconUpload = computed(() => {
  if (props.icon) {
    return props.icon;
  }

  return 'image';
});

const labelUpload = computed(() => {
  if (props.label) {
    return props.label;
  }

  return 'Выбрать файл';
});
</script>
