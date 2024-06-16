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
      @change="handleFileChange"
    />
  </button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
//@ts-ignore
import icons from '@/assets/icons/sprites/inputs.svg';

interface IProps {
  label?: string;
  icon?: string;
  fileType: string;
  modelValue?: string;
}

interface IEmits {
  (e: 'update:modelValue', newValue: string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

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

// eslint-disable-next-line
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    const file = target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        emit('update:modelValue', reader.result as string);
      }
    };

    reader.readAsDataURL(file);
  }
};
</script>
