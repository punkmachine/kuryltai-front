<template>
  <div class="relative">
    <button
      v-bind="$attrs"
      @click="uploadClick"
      class="upload"
      :class="{
        'upload--loading': loading,
      }"
    >
      <svg>
        <use :xlink:href="`${icons}#${iconUpload}`"></use>
      </svg>
      <span>{{ labelUpload }}</span>

      <input
        v-if="!withClick"
        v-bind="$attrs"
        class="absolute bottom-0 left-0 right-0 top-0 z-50 opacity-0"
        type="file"
        :accept="fileType"
        @change="handleFileChange"
      />
    </button>

    <div
      v-if="loading"
      class="absolute right-1/2 top-1/2 translate-x-1/2 -translate-y-1/2 z-50 w-6 h-6"
    >
      <div class="loader !w-6 !h-6 !border-2"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
//@ts-ignore
import icons from '@/assets/icons/sprites/inputs.svg';

interface IProps {
  label?: string;
  icon?: string;
  fileType: string;
  modelValue?: any;
  emitFullFile?: boolean;
  withClick?: boolean;
  loading?: boolean;
}

interface IEmits {
  (e: 'update:modelValue', newValue: any): void;
  (e: 'click'): void;
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
  if (props.withClick) return;

  const target = event.target as HTMLInputElement;

  if (target.files && target.files.length > 0) {
    const file = target.files[0];

    if (props.emitFullFile) {
      emit('update:modelValue', file);

      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.result) {
        emit('update:modelValue', reader.result as string);
      }
    };

    reader.readAsDataURL(file);
  }
};

function uploadClick() {
  if (props.withClick) {
    emit('click');
  }
}
</script>
