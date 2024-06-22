<template>
  <div class="grid grid-cols-4 items-center">
    <UIUpload
      v-model="currentImage"
      label="Фото"
      icon="image"
      class="w-full justify-center rounded-e-none border-r-0"
      file-type=".jpg,.webp,.png,.jpeg,.avif"
    />
    <UIUpload
      label="Видео"
      icon="video"
      class="w-full justify-center rounded-none border-r-0"
      file-type=".mp4,.mov,.mkv"
    />
    <UIUpload
      label="Аудио"
      icon="audio"
      class="w-full justify-center rounded-none border-r-0"
      file-type=".mp3"
    />
    <UIUpload
      label="Файл"
      icon="file"
      class="w-full justify-center rounded-s-none"
      file-type=".doc,.docx,.csv,.xls,.xlsx"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import UIUpload from '@/components/ui/UIUpload.vue';

interface IProps {
  image: string,
}

interface IEmits {
  (e: 'update:image', newValue: string): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const currentImage = ref<any>();

watch(() => currentImage.value, () => {
  emit('update:image', currentImage.value);
});
</script>
