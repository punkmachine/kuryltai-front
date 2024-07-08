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
        <UIImage
          :src="image"
          with-delete
          @delete="addDeletedImage(image)"
        />
      </div>

      <div
        v-for="(audio, index) in content.audio.audio_file_urls"
        :key="`audio-${index}`"
        class="mb-4 flex flex-col gap-2"
      >
        <UIAudio
          :file-name="isEditPost ? audio : content.audio.audio_file_names[index]"
          :src="audio"
          with-delete
          @delete="addDeletedAudio(audio)"
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
          with-delete
          @delete="addDeletedVideo(video)"
        />
      </div>

      <div
        v-for="(video, index) in content.video.video_urls"
        :key="`video-${index}`"
        class="mb-4 flex flex-col gap-2"
      >
        <UIYouTube
          :src="video"
          with-delete
          @delete="addDeletedYouTube(video)"
        />
      </div>

      <div
        v-for="(file, index) in content.document.document_file_urls"
        :key="`file-${index}`"
        class="mb-4 flex flex-col gap-2"
      >
        <UIFile
          :name="isEditPost ? file : content.document.document_file_names[index]"
          :src="file"
          with-delete
          @delete="addDeletedFile(file)"
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
        v-if="!isEditPost"
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

      <button
        v-else
        @click="postSave"
        class="btn mt-7 uppercase"
        :class="{
          'btn--primary': !loading && validContent,
          'btn--secondary': loading || !validContent,
        }"
        :disabled="loading || !validContent"
      >
        Сохранить
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
          :disabled="Boolean(currentVideo)"
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
          :disabled="Boolean(currentYouTube)"
        />

        <button
          class="btn mt-5 uppercase"
          :class="{
            'btn--primary': validVideo,
            'btn--secondary': !validVideo,
          }"
          :disabled="!validVideo"
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
import { useRouter, useRoute } from 'vue-router';
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

const router = useRouter();
const route = useRoute();

const myProfileStore = useMyProfileStore();

const { myMemberships } = storeToRefs(myProfileStore);

const editedPost = ref<any>({});
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

const deletedContent = ref<number[]>([]);
const addedContent = reactive<any>({
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

const validVideo = computed(() => {
  return Boolean(currentYouTube.value) || uploadedVideo.value;
});

const validContent = computed(() => {
  return Boolean(postData.title);
});

const isEditPost = computed(() => {
  return Boolean(route.query.edited);
});

watch(
  () => currentImage.value,
  () => {
    if (currentImage.value) {
      if (isEditPost.value) {
        addedContent.image.image_files.push(currentImage.value);
      }

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

// eslint-disable-next-line
function addDeletedImage(image: string) {
  let imgId = null;

  if (editedPost.value.contents.image.length) {
    imgId = editedPost.value.contents.image.find((img: any) => img.value === image)?.id;

    if (imgId) {
      deletedContent.value.push(imgId);
    }
  } else {
    addedContent.image.image_files = addedContent.image.image_files.filter((img: string) => img !== image);
  }

  content.image.image_files = content.image.image_files.filter((img: string) => img !== image);
}

// eslint-disable-next-line
function addDeletedAudio(audio: string) {
  if (isEditPost.value) {
    let audioId = null;

    if (editedPost.value.contents.audio?.length) {
      audioId = editedPost.value.contents.audio.find((audioItem: any) => audioItem.value === audio)?.id;

      if (audioId) {
        deletedContent.value.push(audioId);
      }
    } else {
      addedContent.audio.audio_file_urls = addedContent.audio.audio_file_urls.filter(
        (audioStr: string) => audioStr !== audio,
      );
    }
    content.audio.audio_file_urls = content.audio.audio_file_urls.filter((audioStr: string) => audioStr !== audio);
  } else {
    content.audio.audio_file_urls = content.audio.audio_file_urls.filter((audioStr: string) => audioStr !== audio);
  }
}

// eslint-disable-next-line
function addDeletedVideo(video: string) {
  if (isEditPost.value) {
    let videoId = null;

    if (editedPost.value.contents.video?.files?.length) {
      videoId = editedPost.value.contents.video?.files?.find((videoItem: any) => videoItem.value === video)?.id;

      if (videoId) {
        deletedContent.value.push(videoId);
      }
    } else {
      addedContent.video.video_file_urls = addedContent.video.video_file_urls.filter(
        (videoStr: string) => videoStr !== video,
      );
    }

    content.video.video_file_urls = content.video.video_file_urls.filter((videoStr: string) => videoStr !== video);
  } else {
    content.video.video_file_urls = content.video.video_file_urls.filter((videoStr: string) => videoStr !== video);
  }
}

// eslint-disable-next-line
function addDeletedYouTube(video: string) {
  if (isEditPost.value) {
    let videoId = null;

    if (editedPost.value.contents.video?.urls?.length) {
      videoId = editedPost.value.contents.video?.urls?.find((videoItem: any) => videoItem.value === video)?.id;

      if (videoId) {
        deletedContent.value.push(videoId);
      }
    } else {
      addedContent.video.video_urls = addedContent.video.video_urls.filter((videoStr: string) => videoStr !== video);
    }

    content.video.video_urls = content.video.video_urls.filter((videoStr: string) => videoStr !== video);
  } else {
    content.video.video_urls = content.video.video_urls.filter((videoStr: string) => videoStr !== video);
  }
}

// eslint-disable-next-line
function addDeletedFile(file: string) {
  if (isEditPost.value) {
    let fileId = null;

    if (editedPost.value.contents.document?.length) {
      fileId = editedPost.value.contents.document?.find((documentItem: any) => documentItem.value === file)?.id;

      if (fileId) {
        deletedContent.value.push(fileId);
      }
    } else {
      addedContent.document.document_file_urls = addedContent.document.document_file_urls.filter(
        (docStr: string) => docStr !== file,
      );
    }

    content.document.document_file_urls = content.document.document_file_urls.filter(
      (docStr: string) => docStr !== file,
    );
  }

  content.document.document_file_urls = content.document.document_file_urls.filter((docStr: string) => docStr !== file);
}

// eslint-disable-next-line
function addUploadVideo() {
  if (currentUploadVideo.value.name && currentUploadVideo.value.url) {
    content.video.video_file_names.push(currentUploadVideo.value.name);
    content.video.video_file_urls.push(currentUploadVideo.value.url);

    if (isEditPost.value) {
      addedContent.video.video_file_urls.push(currentUploadVideo.value.url);
    }

    currentVideo.value = '';
  } else {
    content.video.video_urls.push(currentYouTube.value);

    if (isEditPost.value) {
      addedContent.video.video_urls.push(currentYouTube.value);
    }

    currentYouTube.value = '';
  }

  uploadVideoModalVisible.value = false;
  uploadedVideo.value = false;
  currentUploadVideo.value.name = '';
  currentUploadVideo.value.url = '';
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

            if (isEditPost.value) {
              addedContent.audio.audio_file_urls.push(data.url);
            }

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

            if (isEditPost.value) {
              addedContent.document.document_file_urls.push(data.url);
            }

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
    description: postData.description,
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

// eslint-disable-next-line max-lines-per-function
function adapterSavePost() {
  let payload: any = {
    title: postData.title,
    text: postData.description,
    description: postData.description,
    permission_level: accessType.value,
    membership: accessType.value === 'SELECT_LEVEL' ? [selectedAccessType.value] : [],
    added_contents: {},
    tags: postData.tags,
  };

  if (addedContent.image.image_files.length) {
    payload.added_contents.image = addedContent.image;
  } else {
    payload.added_contents.image = {
      image_files: [],
    };
  }

  if (addedContent.document.document_file_urls.length) {
    payload.added_contents.document = {
      document_file_urls: addedContent.document.document_file_urls,
    };
  } else {
    payload.added_contents.document = {
      document_file_urls: [],
    };
  }

  if (addedContent.audio.audio_file_urls.length) {
    payload.added_contents.audio = {
      audio_file_urls: addedContent.audio.audio_file_urls,
    };
  } else {
    payload.added_contents.audio = {
      audio_file_urls: [],
    };
  }

  if (addedContent.video.video_file_urls.length) {
    payload.added_contents.video = {
      video_file_urls: addedContent.video.video_file_urls,
    };
  } else {
    payload.added_contents.video = {
      video_file_urls: [],
    };
  }

  if (addedContent.video.video_urls.length) {
    payload.added_contents.video = {
      ...payload.added_contents.video,
      video_urls: addedContent.video.video_urls,
    };
  } else {
    payload.added_contents.video = {
      ...payload.added_contents.video,
      video_urls: [],
    };
  }

  if (deletedContent.value.length) {
    payload.deleted_contents = deletedContent.value;
  }

  return payload;
}

function createPost() {
  const payload = adapterCreatePost();

  api.posts.createPost(payload).then(() => {
    uploadedVideo.value = false;
    router.push('/');
  });
}

function uploadFilesClick(type: 'video' | 'audio' | 'file' | 'image') {
  if (type === 'video') {
    uploadVideoModalVisible.value = true;
  }
}

function postSave() {
  const payload = adapterSavePost();

  // @ts-ignore
  api.posts.editPostById(payload, route.query.edited).then(() => {
    fetchEditPost();
    router.push('/');
  });
}

// eslint-disable-next-line max-lines-per-function
function fetchEditPost() {
  // @ts-ignore
  // eslint-disable-next-line max-lines-per-function
  api.posts.getPostById(route.query.edited).then(data => {
    editedPost.value = data;

    postData.title = editedPost.value.title;
    postData.description = editedPost.value.description;
    postData.tags = editedPost.value.tags;

    if (editedPost.value.contents.image?.length) {
      content.image.image_files = editedPost.value.contents.image.map((item: any) => item.value);
    }

    if (editedPost.value.contents.video?.urls?.length) {
      content.video.video_urls = editedPost.value.contents.video?.urls?.map((item: any) => item.value);
    }

    if (editedPost.value.contents.video?.files?.length) {
      content.video.video_file_urls = editedPost.value.contents.video?.files?.map((item: any) => item.value);
    }

    if (editedPost.value.contents.audio?.length) {
      content.audio.audio_file_urls = editedPost.value.contents.audio?.map((item: any) => item.value);
    }

    if (editedPost.value.contents.document?.length) {
      content.document.document_file_urls = editedPost.value.contents.document?.map((item: any) => item.value);
    }
  });
}

// eslint-disable-next-line max-lines-per-function
onMounted(() => {
  myProfileStore.fetchMyProfile();
  myProfileStore.fetchMyMemberships();

  if (isEditPost.value) {
    fetchEditPost();
  }
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
