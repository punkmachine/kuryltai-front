<template>
  <article class="profile__head">
    <div class="profile__cover">
      <img
        v-if="profileData?.cover_image"
        :src="profileData?.cover_image"
        alt="cover image"
      />
      <img
        v-else
        src="@/assets/images/default-cover.png"
        alt="default-cover"
      />
    </div>

    <div class="profile__info">
      <div class="profile__avatar-wrapper">
        <UIAvatar
          v-if="profileData?.avatar_image"
          :src="profileData?.avatar_image"
          size="big"
        />
        <img
          v-else
          src="@/assets/images/default-avatar.png"
          alt="Default avatar"
          class="profile__avatar"
        />
      </div>

      <div class="profile__info-data">
        <h1 class="profile__name">{{ profileData?.username }}</h1>

        <div class="profile__meta">
          <span class="max-w-44 overflow-hidden text-ellipsis whitespace-nowrap">{{
              profileData?.head_line
            }}</span>
          <br>
          •
          <span>{{ profileData?.subscribers_count }} подписчиков</span>
          •
          <span>{{ postsCountText }}</span>
        </div>

        <div
          class="flex items-center gap-4"
          v-if="!myProfile"
        >
          <button
            class="btn btn--with-icon btn--success w-auto uppercase"
            @click="$emit('show-donate')"
          >
            <svg>
              <use xlink:href="@/assets/icons/sprites/btns.svg#donate"></use>
            </svg>
            <span> Задонатить </span>
          </button>
          <!-- <button
            class="btn btn--with-icon btn--outline w-auto uppercase"
            @click="$emit('subscribe-user')"
          >
            <svg>
              <use xlink:href="@/assets/icons/sprites/btns.svg#follow"></use>
            </svg>
            <span> Отслеживать </span>
          </button> -->
        </div>

        <div
          class="flex items-center gap-4"
          v-else
        >
          <RouterLink
            to="/add-post"
            class="btn btn--with-icon btn--primary w-auto uppercase"
          >
            <svg class="fill-white">
              <use xlink:href="@/assets/icons/sprites/btns.svg#add"></use>
            </svg>
            <span> Создать пост </span>
          </RouterLink>
          <button
            class="btn btn--with-icon btn--outline w-auto uppercase"
            @click="$emit('add-subscription')"
          >
            <svg>
              <use xlink:href="@/assets/icons/sprites/btns.svg#add-subscription"></use>
            </svg>
            <span> Добавить подписку </span>
          </button>
        </div>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';

import { useUsersStore } from '@/store';
import { useMyProfileStore } from '@/store';

import UIAvatar from '@/components/ui/UIAvatar.vue';

interface IProps {
  myProfile?: boolean;
}

interface IEmits {
  (e: 'add-subscription'): void;

  (e: 'show-donate'): void;

  (e: 'subscribe-user'): void;
}

interface ProfileData {
  cover_image?: string;
  avatar_image?: string;
  username: string;
  head_line?: string;
  subscribers_count: number;
  posts_total_count: number;
}

const props = defineProps<IProps>();
defineEmits<IEmits>();

const usersStore = useUsersStore();
const myProfileStore = useMyProfileStore();

const { currentUser } = storeToRefs(usersStore);
const { profile } = storeToRefs(myProfileStore);

const profileData = computed<ProfileData | null>(() => {
  if (props.myProfile) {
    return profile.value as ProfileData;
  } else {
    return currentUser.value as ProfileData;
  }
});

const postsCountText = computed(() => {
  const count = profileData.value?.posts_total_count || 0;
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return `${count} постов`;
  } else if (lastDigit === 1) {
    return `${count} пост`;
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return `${count} поста`;
  } else {
    return `${count} постов`;
  }
});
</script>

<style scoped>
.profile__head {
  @apply rounded-lg bg-white shadow-standard;
}

.profile__cover {
  @apply h-64 w-full overflow-hidden rounded-lg;
}

.profile__cover-placeholder {
  @apply flex h-full w-full items-center justify-center bg-slate-100 text-2xl uppercase text-slate-500;
}

.profile__cover > img {
  @apply h-full w-full object-cover;
}

.profile__info {
  @apply relative pb-4 pl-4 pt-2;
}

.profile__info-data {
  @apply flex flex-col;

  /* 14px (отступ слева от иконки) + 176px (ширина авы) */
  margin-left: 190px;
}

.profile__avatar {
  @apply h-44 w-44 rounded-full object-cover;
}

.profile__avatar-wrapper {
  @apply absolute bottom-3.5 left-3.5 rounded-full border-4 border-solid border-white;
}

.profile__name {
  @apply break-all text-left text-2xl font-semibold text-gray-900;
}

.profile__meta {
  @apply mb-4 text-sm font-medium text-gray-600;
}
</style>
