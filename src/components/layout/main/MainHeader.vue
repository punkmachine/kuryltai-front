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
          class="absolute left-0 bg-white z-50 rounded-xl shadow-md p-6 top-14"
          :class="{
            'hidden': !openedSearch,
            'block': openedSearch,
          }"
        >
          <h4 class="mb-2.5 text-base text-gray-900 font-bold">Результаты поиска</h4>

          <RouterLink
            v-for="user in searchResults"
            :key="user.profile_uuid"
            :to="`/user/${user.slug}`"
            class="flex flex-col"
            @click="openedSearch = false"
          >
            <div class="py-3.5 border-b border-blue-gray-50 last:border-none flex items-center gap-4">
              <UIAvatar
                :src="user.avatar_image"
                size="medium"
              />

              <div class="flex flex-col items-center">
                <p class="text-gray-900 text-sm font-bold">
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
            size="medium"
            :src="profileStore.profile?.avatar_image"
          />

          <span class="text-sm font-medium text-gray-600">{{ profile?.username || '' }}</span>

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
            >Денюжки</RouterLink
          >
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
import { onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useDebounceFn } from '@vueuse/core'

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

watch(() => search.value, () => {
  if (search.value.length > 2) {
    fetchSearchResults();
  } else {
    searchResults.value = [];
    openedSearch.value = false;
  }
});

const fetchSearchResults = useDebounceFn(() => {
  api.profile.searchProfileByUsername(search.value)
    .then(data => {
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

onMounted(() => {
  if (!profileStore.profile) {
    profileStore.fetchMyProfile();
  }
});
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
</style>
