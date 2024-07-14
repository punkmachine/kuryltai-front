/* eslint-disable max-lines-per-function */
import { ref } from 'vue';
import { defineStore } from 'pinia';

import { api } from '@/api';

export const useUsersStore = defineStore('users', () => {
  const currentUser = ref<any>(null);
  const currentUserMemberships = ref<any[]>([]);
  const userPosts = ref<any[]>([]);

  function fetchUser(slug: string) {
    api.profile.getProfileBySlug(slug).then(data => {
      currentUser.value = data;
    });
  }

  function fetchMemberships(slug: string) {
    api.memberships.getUserMembershipsBySlug(slug).then(data => {
      currentUserMemberships.value = data;
    });
  }

  function fetchUserPosts(slug: string, page: number = 1) {
    api.posts.getPostsBySlug(slug, page).then(data => {
      userPosts.value = [...userPosts.value, ...data.results];
    });
  }

  function initData() {
    userPosts.value = [];
    currentUserMemberships.value = [];
  }

  return {
    fetchUser,
    fetchMemberships,
    fetchUserPosts,
    initData,
    currentUser,
    currentUserMemberships,
    userPosts,
  };
});
