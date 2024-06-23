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
        v-model:file="currentFile"
        v-model:audio="currentAudio"
        @click="uploadFilesClick"
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
        v-for="(video, index) in content.video.video_urls"
        :key="`video-${index}`"
        class="mb-4 flex flex-col gap-2"
      >
        <UIYouTube :src="video" />
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
        class="btn mt-7 uppercase"
        :class="{
          'btn--primary': !loading && validContent,
          'btn--secondary': loading || !validContent,
        }"
        :disabled="loading || !validContent"
      >
        Опубликовать
      </button>
    </div>

    <UIModal
      :visible="uploadVideoModalVisible"
      class="w-108"
      @close="closeUploadVideoModal"
    >
      <template #header>
        <h3 class="text-center text-xl font-bold text-gray-900">Добавить видео</h3>
      </template>

      <template #body>
        <UIInput
          v-model="currentYouTube"
          required
          autocomplete="off"
          placeholder="Ссылка"
          label="Ссылка на YouTube"
        />

        <div class="divider-with-text">или</div>

        <p class="mt-3 text-center text-sm text-blue-gray-500">Загрузите видео до 500 МБ</p>

        <UIUpload
          v-model="currentVideo"
          label="Файл"
          icon="file"
          class="mt-3 w-full justify-center"
          file-type=".mp4,.mov,.mkv"
          emit-full-file
        />

        <button
          class="btn mt-5 uppercase"
          :class="{
            'btn--primary': validVideo,
            'btn--secondary': !validVideo,
          }"
          @click="addUploadVideo"
        >
          Добавить
        </button>
      </template>
    </UIModal>
  </section>
</template>

<script lang="ts" setup>
/* eslint-disable max-lines */
import { reactive, ref, onMounted, watch, computed } from 'vue';
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
import UIModal from '@/components/ui/UIModal.vue';
import UIUpload from '@/components/ui/UIUpload.vue';
import UIYouTube from '@/components/ui/UIYouTube.vue';

const myProfileStore = useMyProfileStore();

const { myMemberships } = storeToRefs(myProfileStore);

const loading = ref<boolean>(false);
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
const currentYouTube = ref<string>('');
const currentAudio = ref<any>('');
const currentFile = ref<any>('');

const uploadedVideo = ref<boolean>(false);
const currentUploadVideo = ref<any>({});

const uploadVideoModalVisible = ref<boolean>(false);

const validVideo = computed(() => {
  return Boolean(currentYouTube.value) || uploadedVideo.value;
});

const validContent = computed(() => {
  return Boolean(postData.title);
});

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
    if (currentVideo.value) {
      uploadFile(currentVideo.value, 'video_type');
    }
  },
);

watch(
  () => currentAudio.value,
  () => {
    if (currentAudio.value) {
      uploadFile(currentAudio.value, 'audio_type');
    }
  },
);

watch(
  () => currentFile.value,
  () => {
    if (currentFile.value) {
      uploadFile(currentFile.value, 'file_type');
    }
  },
);

function addUploadVideo() {
  if (currentUploadVideo.value.name && currentUploadVideo.value.url) {
    content.video.video_file_names.push(currentUploadVideo.value.name);
    content.video.video_file_urls.push(currentUploadVideo.value.url);
    currentVideo.value = '';
  } else {
    content.video.video_urls.push(currentYouTube.value);
    currentYouTube.value = '';
  }

  uploadVideoModalVisible.value = false;
}

function closeUploadVideoModal() {
  uploadVideoModalVisible.value = false;
  uploadedVideo.value = false;
}

// eslint-disable-next-line
function uploadFile(file: any, contentType: string) {
  loading.value = true;
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
            uploadedVideo.value = true;
            currentUploadVideo.value.name = currentVideo.value.name;
            currentUploadVideo.value.url = data.url;
          }

          if (contentType === 'file_type') {
            content.document.document_file_names.push(currentFile.value.name);
            content.document.document_file_urls.push(data.url);
            currentFile.value = '';
          }

          loading.value = false;
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
    payload.content.document = {
      document_file_urls: content.document.document_file_urls,
    };
  }

  if (content.audio.audio_file_urls.length) {
    payload.content.audio = {
      audio_file_urls: content.audio.audio_file_urls,
    };
  }

  if (content.video.video_file_urls.length) {
    payload.content.video = {
      video_file_urls: content.video.video_file_urls,
    };
  }

  if (content.video.video_urls.length) {
    payload.content.video = {
      ...payload.content.video,
      video_urls: content.video.video_urls,
    };
  }

  return payload;
}

function createPost() {
  const payload = adapterCreatePost();

  api.posts.createPost(payload).then(data => {
    console.log('data >>>', data);

    uploadedVideo.value = false;
    // заинитить все current значения и reactive.
  });
}

function uploadFilesClick(type: 'video' | 'audio' | 'file' | 'image') {
  if (type === 'video') {
    uploadVideoModalVisible.value = true;
  }
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

.divider-with-text {
  @apply relative mt-3 text-center text-sm text-blue-gray-500;
}

.divider-with-text::before {
  content: '';
  @apply absolute bottom-1/2 left-0 h-px w-40 translate-y-1/2 bg-gray-300;
}

.divider-with-text::after {
  content: '';
  @apply absolute bottom-1/2 right-0 h-px w-40 translate-y-1/2 bg-gray-300;
}
</style>
