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
      />

      <div
        v-for="(image, index) in content.images"
        :key="`image-${index}`"
        class="mb-6 flex flex-col gap-2"
      >
        <UIImage :src="image" />
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
        v-if="accessType === 'change-type'"
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
  images: [],
})
const currentImage = ref<any>('');

watch(() => currentImage.value, () => {
  if (currentImage.value) {
    content.images.push(currentImage.value);
  }

  currentImage.value = '';
});

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

  if (content.images.length) {
    payload.content.images = [...content.images];
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
