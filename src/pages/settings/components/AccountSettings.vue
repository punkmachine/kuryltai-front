<template>
  <div>
    <p class="text-sm text-gray-900">Фотография обложки</p>

    <div class="mt-3 w-full overflow-hidden rounded-lg">
      <div
        v-if="!coverImage"
        class="profile__cover"
      >
        placeholder
      </div>
      <img
        v-else
        :src="coverImage"
        alt=""
        height="160px"
        class="h-40 w-full object-cover"
      />
    </div>

    <UIUpload
      v-model="coverImage"
      file-type=".jpg,.webp,.png,.jpeg,.avif"
      class="mt-3"
    />

    <p class="mt-6 text-sm text-gray-900">Фотография профиля</p>

    <UIAvatar
      :src="avatarImage"
      size="big"
      class="mt-3"
    />

    <UIUpload
      v-model="avatarImage"
      file-type=".jpg,.webp,.png,.jpeg,.avif"
      class="mt-3"
    />

    <div class="mt-6 flex flex-col gap-3.5">
      <UIInput
        v-model="profileData.name"
        label="Имя профиля"
        placeholder="Имя профиля"
        required
      />

      <!--      <UIInput-->
      <!--        v-model="profileData.description"-->
      <!--        label="Описание профиля"-->
      <!--        placeholder="Описание профиля"-->
      <!--        required-->
      <!--      />-->

      <!-- <UIInput
        v-model="profileData.slug"
        label="Ссылка профиля"
        placeholder="Ссылка профиля"
        required
      /> -->

      <UIInput
        v-model="profileData.headLine"
        label="head line"
        placeholder="head line"
      />

      <UIInput
        v-model="profileData.slug"
        label="Скопируйте ссылку для приглашения новых подписчиков"
        :placeholder="`https://kuryltai.kz/user/${profileData.slug}`"
        constant-value="https://kuryltai.kz/user/"
        required
      >
        <template #after-inner>
          <button
            @click="copySlug"
            class="button h-9 rounded-md bg-gray-900 px-2 text-white"
          >
            КОПИРОВАТЬ
          </button>
        </template>
      </UIInput>

      <button
        class="btn btn--primary mt-4 w-max px-10 uppercase"
        @click="saveProfileSettings"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

import { useMyProfileStore } from '@/store';
import { api } from '@/api';

import UIUpload from '@/components/ui/UIUpload.vue';
import UIAvatar from '@/components/ui/UIAvatar.vue';
import UIInput from '@/components/ui/UIInput.vue';

const myProfileStore = useMyProfileStore();
const { profile } = storeToRefs(myProfileStore);

const coverImage = ref<any>('');
const avatarImage = ref<any>('');
const profileData = ref({
  name: '',
  description: '',
  slug: '',
  headLine: '',
});

watch(
  () => profile.value,
  () => {
    profileData.value.description = profile.value.bio;
    profileData.value.slug = profile.value.slug;
    profileData.value.name = profile.value.username;
    profileData.value.headLine = profile.value.head_line;
  },
);

// eslint-disable-next-line
function saveProfileSettings() {
  const payload: any = {
    bio: profileData.value.description,
    slug: profileData.value.slug,
    username: profileData.value.name,
    head_line: profileData.value.headLine,
  };

  if (avatarImage.value !== profile.value.avatar_image) {
    payload.avatar_image = avatarImage.value;
  }

  if (coverImage.value !== profile.value.cover_image) {
    payload.cover_image = coverImage.value;
  }

  api.profile.editMyProfile(payload).then(() => {
    myProfileStore.fetchMyProfile(setInitialProfileData);
  });
}

function setInitialProfileData() {
  profileData.value.description = profile.value.bio;
  profileData.value.slug = profile.value.slug;
  profileData.value.name = profile.value.username;
  profileData.value.headLine = profile.value.head_line;
  avatarImage.value = profile.value.avatar_image;
  coverImage.value = profile.value.cover_image;
}

function copySlug() {
  navigator.clipboard
    .writeText(`https://kuryltai.kz/user/${profileData.value.slug}`)
    .then(() => {
      toast.success('Ссылка успешно скопирована!');
    })
    .catch(() => {
      toast.error('Произошла ошибка копирования.');
    });
}

onMounted(() => {
  if (!profile.value) {
    myProfileStore.fetchMyProfile(setInitialProfileData);
  } else {
    setInitialProfileData();
  }
});
</script>

<style scoped>
.profile__cover {
  @apply flex h-40 w-full items-center justify-center bg-slate-100 text-2xl uppercase text-slate-500;
}
</style>
