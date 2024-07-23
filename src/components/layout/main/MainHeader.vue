<template>
  <header class="header">
    <div class="header__content">
      <RouterLink
        to="/"
        class="mb-1 block h-8 w-[122px] cursor-pointer"
      >
        <img
          src="@/assets/icons/logo.svg"
          alt=""
        />
      </RouterLink>

      <div class="relative">
        <UIInput
          v-model="search"
          placeholder="Поиск"
          class="w-96"
        />

        <div
          class="absolute left-0 top-14 z-50 rounded-xl bg-white p-6 shadow-md"
          :class="{
            hidden: !openedSearch,
            block: openedSearch,
          }"
        >
          <h4 class="mb-2.5 text-base font-bold text-gray-900">Результаты поиска</h4>

          <RouterLink
            v-for="user in searchResults"
            :key="user.profile_uuid"
            :to="`/user/${user.slug}`"
            class="flex flex-col"
            @click="openedSearch = false"
          >
            <div class="flex items-center gap-4 border-b border-blue-gray-50 py-3.5 last:border-none">
              <UIAvatar
                v-if="user.avatar_image"
                :src="user.avatar_image"
                size="medium"
              />
              <img
                v-else
                src="@/assets/images/default-avatar.png"
                alt="Default avatar"
                class="profile__avatar"
              />

              <div class="flex flex-col items-center">
                <p class="text-sm font-bold text-gray-900">
                  {{ user.username }}
                </p>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>

      <div
        class="relative cursor-pointer"
        @click="showProfileDropdown"
      >
        <div class="flex items-center gap-1.5">
          <UIAvatar
            v-if="profileStore.profile?.avatar_image"
            size="medium"
            :src="profileStore.profile?.avatar_image"
          />
          <img
            v-else
            src="@/assets/images/default-avatar.png"
            alt="Default avatar"
            class="profile__avatar"
          />

          <span class="max-w-44 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium text-gray-600">{{
              profile?.username || ''
            }}</span>

          <div>
            <svg class="h-5 w-5 fill-blue-gray-500">
              <use xlink:href="@/assets/icons/sprites/btns.svg#arrow"></use>
            </svg>
          </div>
        </div>

        <div
          class="header__dropdown"
          :class="{
            'header__dropdown--active': visibleDropdown,
          }"
        >
          <RouterLink
            to="/money"
            class="header__dropdown-item"
          >Баланс
          </RouterLink>
          <button
            class="header__dropdown-item text-left"
            @click="logout"
          >
            Выйти
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core';

import { api } from '@/api';
import { useMyProfileStore } from '@/store';

import UIInput from '@/components/ui/UIInput.vue';
import UIAvatar from '@/components/ui/UIAvatar.vue';
import { goToLogin } from '@/helpers/goToLoginPage';

const profileStore = useMyProfileStore();

const { profile } = storeToRefs(profileStore);

const search = ref<string>('');
const searchResults = ref<any[]>([]);
const visibleDropdown = ref<boolean>(false);
const openedSearch = ref<boolean>(false);

watch(
  () => search.value,
  () => {
    if (search.value.length > 2) {
      fetchSearchResults();
    } else {
      searchResults.value = [];
      openedSearch.value = false;
    }
  },
);

const fetchSearchResults = useDebounceFn(() => {
  api.profile.searchProfileByUsername(search.value).then(data => {
    openedSearch.value = true;
    searchResults.value = data.results;
  });
}, 400);

function showProfileDropdown() {
  visibleDropdown.value = !visibleDropdown.value;
}

function logout() {
  goToLogin();
}
</script>

<style scoped>
.header {
  @apply fixed top-0 z-10 flex w-full justify-center bg-white;

  height: var(--header-height);
}

.header__content {
  @apply flex w-full items-center justify-between px-3 py-3 xl:max-w-7xl xl:px-0;
}

.header__dropdown {
  @apply absolute bottom-[-106px] right-0 z-30 hidden min-w-32 flex-col rounded-lg bg-white p-2;
}

.header__dropdown--active {
  @apply flex;
}

.header__dropdown-item {
  @apply rounded-md p-2 px-4 text-sm font-medium text-blue-gray-500 transition-colors hover:bg-blue-gray-50;
}

.profile__avatar {
  @apply h-8 w-8 rounded-full object-cover;
}
</style>
