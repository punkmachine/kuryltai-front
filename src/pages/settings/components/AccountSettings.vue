<template>
  <div>
    <p class="text-sm text-gray-900">Фотография обложки</p>

    <div class="mt-3 w-full overflow-hidden rounded-lg">
      <img
        src="/demo/cover.png"
        alt=""
        height="160px"
        class="h-40 w-full object-cover"
      />
    </div>

    <UIUpload class="mt-3" />

    <p class="mt-6 text-sm text-gray-900">Фотография профиля</p>

    <UIAvatar
      src="https://avatars.githubusercontent.com/u/76869388?v=4"
      size="big"
      class="mt-3"
    />

    <UIUpload class="mt-3" />

    <form
      class="mt-6 flex flex-col gap-3.5"
      @submit.prevent="() => {}"
    >
      <UIInput
        v-model="profileData.name"
        label="Имя профиля"
        placeholder="Имя профиля"
        required
      />

      <UIInput
        v-model="profileData.description"
        label="Описание профиля"
        placeholder="Описание профиля"
        required
      />

      <UIInput
        v-model="profileData.login"
        label="Логин"
        placeholder="Логин"
        required
      />

      <button
        type="submit"
        class="btn btn--primary mt-4 w-max px-10 uppercase"
      >
        Сохранить
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import UIUpload from '@/components/ui/UIUpload.vue';
import UIAvatar from '@/components/ui/UIAvatar.vue';
import UIInput from '@/components/ui/UIInput.vue';

const profileData = ref({
  name: '',
  description: '',
  login: '',
});
</script>
