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

      <UIUploadGroup />

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
        :default-value="'public'"
        :options="[
          {
            label: 'Публичный',
            value: 'public',
          },
          {
            label: 'Только подписчики',
            value: 'followers-only',
          },
          {
            label: 'Выбрать уровень',
            value: 'change-type',
          },
        ]"
      />

      <UISelect
        v-if="accessType === 'change-type'"
        v-model="selectedAccessType"
        class="mt-2"
        placeholder="Выберите уровень"
        :options="[
          {
            label: 'Стандартная',
            value: 'standard',
          },
          {
            label: 'Меценат',
            value: 'mecenat',
          },
          {
            label: 'Олигарх',
            value: 'oligarh',
          },
        ]"
        :last-item="{
          label: '+ Добавить уровень',
          click: () => {},
        }"
      />

      <button class="btn btn--primary mt-7 uppercase">Опубликовать</button>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import UIRadioGroup from '@/components/ui/UIRadioGroup.vue';
import UIInput from '@/components/ui/UIInput.vue';
import UIUploadGroup from '@/components/ui/UIUploadGroup.vue';
import UISelect from '@/components/ui/UISelect.vue';
import UIInputTags from '@/components/ui/UIInputTags.vue';

interface INewPost {
  title: string;
  description: string;
  tags: string[];
}

const accessType = ref<string>('');
const postData = reactive<INewPost>({
  title: '',
  description: '',
  tags: [],
});
const selectedAccessType = ref<string>('');
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
