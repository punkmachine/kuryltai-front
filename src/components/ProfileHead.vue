<template>
  <article class="profile__head">
    <div class="profile__cover">
      <div
        v-if="!profileData?.value?.cover_image"
        class="profile__cover-placeholder"
      >
        placeholder
      </div>
      <img
        v-else
        :src="profileData?.value?.cover_image"
        alt=""
      />
    </div>

    <div class="profile__info">
      <div class="profile__avatar-wrapper">
        <UIAvatar
          v-if="profileData?.value?.avatar_image"
          :src="profileData?.value?.avatar_image"
          size="big"
        />
      </div>

      <div class="profile__info-data">
        <h1 class="profile__name">{{ profileData?.value?.username }}</h1>

        <div class="profile__meta">
          <span>{{ profileData?.value?.head_line }}</span>
          •
          <span>{{ profileData?.value?.subscribers_count }} подписчиков</span>
          •
          <span>{{ profileData?.value?.posts_total_count }} постов</span>
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
            <svg>
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

const props = defineProps<IProps>();
defineEmits<IEmits>();

const usersStore = useUsersStore();
const myProfileStore = useMyProfileStore();

const { currentUser } = storeToRefs(usersStore);
const { profile } = storeToRefs(myProfileStore);

const profileData = computed(() => {
  if (props.myProfile) {
    return profile;
  } else {
    return currentUser;
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
  @apply text-left text-2xl font-semibold text-gray-900;
}

.profile__meta {
  @apply mb-4 text-sm font-medium text-gray-600;
}
</style>
