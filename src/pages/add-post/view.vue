<template>
  <section class="add-post">
    <div class="add-post__content">
      <UIInput
        v-model="postData.title"
        label="Заголовок поста"
        required
        placeholder="Заголовок"
        autocomplete="off"
      />

      <UIUploadGroup
        v-model:image="currentImage"
        v-model:video="currentVideo"
        v-model:file="currentFile"
        v-model:audio="currentAudio"
      />

      <div
        v-for="(image, index) in content.image.image_files"
        :key="`image-${index}`"
        class="mb-4 flex flex-col gap-2"
      >
        <UIImage :src="image" />
      </div>

      <div
        v-for="(audio, index) in content.audio.audio_file_urls"
        :key="`audio-${index}`"
        class="mb-4 flex flex-col gap-2"
      >
        <UIAudio
          :file-name="content.audio.audio_file_names[index]"
          :src="audio"
        />
      </div>

      <div
        v-for="(video, index) in content.video.video_file_urls"
        :key="`video-${index}`"
        class="mb-4 flex flex-col gap-2"
      >
        <UIVideo
          :file-name="content.video.video_file_names[index]"
          :src="video"
        />
      </div>

      <div
        v-for="(file, index) in content.document.document_file_urls"
        :key="`file-${index}`"
        class="mb-4 flex flex-col gap-2"
      >
        <UIFile
          :name="content.document.document_file_names[index]"
          :src="file"
        />
      </div>

      <UIInput
        v-model="postData.description"
        placeholder="Описание"
        is-textarea
        required
      />

      <div class="flex flex-col gap-2">
        <UIInputTags
          v-model:tags="postData.tags"
          label="Добавьте теги"
        />

        <p class="text-sm text-blue-gray-300">*Для добавления тега нажмите на клавишу Enter</p>
      </div>
    </div>

    <div class="add-post__aside">
      <p class="mb-3.5 text-sm font-medium text-blue-gray-900">Выберите доступ к контенту</p>

      <UIRadioGroup
        v-model="accessType"
        id="access-type"
        :default-value="'PUBLIC'"
        :options="[
          {
            label: 'Публичный',
            value: 'PUBLIC',
          },
          {
            label: 'Только подписчики',
            value: 'SUBSCRIBES_ONLY',
          },
          {
            label: 'Выбрать уровень',
            value: 'SELECT_LEVEL',
          },
        ]"
      />

      <UISelect
        v-if="accessType === 'SELECT_LEVEL'"
        v-model="selectedAccessType"
        class="mt-2"
        placeholder="Выберите уровень"
        :options="
          myMemberships.map(item => ({
            label: item.name,
            value: item.id,
          }))
        "
      />

      <button
        @click="createPost"
        class="btn btn--primary mt-7 uppercase"
      >
        Опубликовать
      </button>
    </div>
  </section>
</template>

<script lang="ts" setup>
/* eslint-disable max-lines */
import { reactive, ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';

import { useMyProfileStore } from '@/store';
import { api } from '@/api';

import UIRadioGroup from '@/components/ui/UIRadioGroup.vue';
import UIInput from '@/components/ui/UIInput.vue';
import UIUploadGroup from '@/components/ui/UIUploadGroup.vue';
import UISelect from '@/components/ui/UISelect.vue';
import UIInputTags from '@/components/ui/UIInputTags.vue';
import UIImage from '@/components/ui/UIImage.vue';
import UIAudio from '@/components/ui/UIAudio.vue';
import UIVideo from '@/components/ui/UIVideo.vue';
import UIFile from '@/components/ui/UIFile.vue';

const myProfileStore = useMyProfileStore();

const { myMemberships } = storeToRefs(myProfileStore);

const accessType = ref<string>('PUBLIC');
const postData = reactive<any>({
  title: '',
  description: '',
  tags: [],
});
const selectedAccessType = ref<string>('');
const content = reactive<any>({
  image: {
    image_files: [],
  },
  video: {
    video_urls: [],
    video_file_urls: [],
    video_file_names: [],
  },
  audio: {
    audio_file_urls: [],
    audio_file_names: [],
  },
  document: {
    document_file_urls: [],
    document_file_names: [],
  },
});
const currentImage = ref<any>('');
const currentVideo = ref<any>('');
const currentAudio = ref<any>('');
const currentFile = ref<any>('');

watch(
  () => currentImage.value,
  () => {
    if (currentImage.value) {
      content.image.image_files.push(currentImage.value);
    }

    currentImage.value = '';
  },
);

watch(
  () => currentVideo.value,
  () => {
    uploadFile(currentVideo.value, 'video_type');
  },
);

watch(
  () => currentAudio.value,
  () => {
    uploadFile(currentAudio.value, 'audio_type');
  },
);

watch(
  () => currentFile.value,
  () => {
    uploadFile(currentFile.value, 'file_type');
  },
);

// eslint-disable-next-line
function uploadFile(file: any, contentType: string) {
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

  const uploadChunk = async (chunk: any, chunkNumber: any) => {
    const formData = new FormData();
    formData.append('file', chunk);
    formData.append('total_chunks', `${totalChunks}`);
    formData.append('total_file_size', `${file.size}`);
    formData.append('file_name', file.name);
    formData.append('content_type', contentType);
    formData.append('chunk_number', `${chunkNumber}`);

    return await api.posts.uploadContent(formData);
  };

  // eslint-disable-next-line
  const uploadChunks = async () => {
    for (let chunkNumber = 0; chunkNumber < totalChunks; chunkNumber++) {
      const start = chunkNumber * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, file.size);
      const chunk = file.slice(start, end);

      try {
        const data = await uploadChunk(chunk, chunkNumber);

        if (data.is_finish) {
          if (contentType === 'audio_type') {
            content.audio.audio_file_names.push(currentAudio.value.name);
            content.audio.audio_file_urls.push(data.url);
            currentAudio.value = '';
          }

          if (contentType === 'video_type') {
            content.video.video_file_names.push(currentVideo.value.name);
            content.video.video_file_urls.push(data.url);
            currentVideo.value = '';
          }

          if (contentType === 'file_type') {
            content.document.document_file_names.push(currentFile.value.name);
            content.document.document_file_urls.push(data.url);
            currentFile.value = '';
          }
        }
      } catch (error) {
        console.log('🚀 ~ uploadChunks ~ error:', error);
      }
    }
  };

  uploadChunks();
}

// eslint-disable-next-line max-lines-per-function
function adapterCreatePost() {
  let payload: any = {
    title: postData.title,
    text: postData.description,
    permission_level: accessType.value,
    membership: accessType.value === 'SELECT_LEVEL' ? [selectedAccessType.value] : [],
    content: {},
    tags: postData.tags,
  };

  if (content.image.image_files.length) {
    payload.content.image = content.image;
  }

  if (content.document.document_file_urls.length) {
    payload.content.document = content.document.document_file_urls;
  }

  if (content.audio.audio_file_urls.length) {
    payload.content.audio = content.audio.audio_file_urls;
  }

  if (content.video.video_file_urls.length) {
    payload.content.video.video_file_urls = content.video.video_file_urls;
  }

  if (content.video.video_urls.length) {
    payload.content.video.video_urls = content.video.video_urls;
  }

  return payload;
}

function createPost() {
  const payload = adapterCreatePost();

  api.posts.createPost(payload).then(data => {
    console.log('data >>>', data);
  });
}

onMounted(() => {
  myProfileStore.fetchMyProfile();
  myProfileStore.fetchMyMemberships();
});
</script>

<style scoped>
.add-post {
  @apply grid gap-x-5;

  grid-template-columns: 2fr 1fr;
}

.add-post__content {
  @apply flex w-[604px] flex-col gap-7 rounded-lg bg-white px-6 py-3 shadow-standard;
}

.add-post__aside {
  @apply flex h-max w-[292px] flex-col rounded-lg bg-white px-3 py-6 shadow-standard;
}
</style>
