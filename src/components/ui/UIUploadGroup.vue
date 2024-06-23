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
      v-model="currentVideo"
      label="Видео"
      icon="video"
      class="w-full justify-center rounded-none border-r-0"
      file-type=".mp4,.mov,.mkv"
      emit-full-file
      with-click
      @click="emit('click', 'video')"
    />
    <UIUpload
      v-model="currentAudio"
      label="Аудио"
      icon="audio"
      class="w-full justify-center rounded-none border-r-0"
      file-type=".mp3"
      emit-full-file
    />
    <UIUpload
      v-model="currentFile"
      label="Файл"
      icon="file"
      class="w-full justify-center rounded-s-none"
      file-type=".doc,.docx,.csv,.xls,.xlsx"
      emit-full-file
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue';
import UIUpload from '@/components/ui/UIUpload.vue';

interface IProps {
  image: string;
}

interface IEmits {
  (e: 'update:image', newValue: string): void;
  (e: 'update:video', newValue: any): void;
  (e: 'update:audio', newValue: any): void;
  (e: 'update:file', newValue: any): void;
  (e: 'click', type: 'video' | 'audio' | 'file' | 'image'): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const currentImage = ref<any>();
const currentVideo = ref<any>();
const currentAudio = ref<any>();
const currentFile = ref<any>();

watch(
  () => currentImage.value,
  () => {
    emit('update:image', currentImage.value);
  },
);

watch(
  () => currentVideo.value,
  () => {
    emit('update:video', currentVideo.value);
  },
);

watch(
  () => currentAudio.value,
  () => {
    emit('update:audio', currentAudio.value);
  },
);

watch(
  () => currentFile.value,
  () => {
    emit('update:file', currentFile.value);
  },
);
</script>
