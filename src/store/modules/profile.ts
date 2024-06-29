/* eslint-disable max-lines-per-function */

import { ref } from 'vue';
import { defineStore } from 'pinia';

import { api } from '@/api';

export const useMyProfileStore = defineStore('my-profile', () => {
  const profile = ref<any>(null);
  const profileCards = ref<any[]>([]);
  const myMemberships = ref<any[]>([]);
  const posts = ref<any[]>([]);
  const loadingPosts = ref<boolean>(false);

  function fetchMyProfile(callback?: () => void) {
    loadingPosts.value = true;

    api.profile
      .getMyProfile()
      .then(data => {
        profile.value = data;
      })
      .then(() => {
        if (callback) {
          callback();
        }
      })
      .finally(() => {
        loadingPosts.value = false;
      });
  }

  function fetchMyCards() {
    api.payments.getPaymentsCards().then(data => {
      profileCards.value = [...data.results];
    });
  }

  function fetchMyMemberships() {
    api.memberships.getUserMemberships().then(data => {
      myMemberships.value = data;
    });
  }

  function fetchMyPosts(page: number = 1, callback?: (postData: any) => void) {
    api.posts.getMyPosts(page).then(data => {
      posts.value = [...posts.value, ...data.results];

      if (callback) {
        callback({ next: data.next });
      }
    });
  }

  function deletePostInStore(id: number) {
    posts.value = posts.value.filter(post => post.id !== id);
  }

  function initPosts() {
    posts.value = [];
  }

  return {
    fetchMyProfile,
    fetchMyCards,
    fetchMyMemberships,
    fetchMyPosts,
    deletePostInStore,
    initPosts,
    profile,
    profileCards,
    myMemberships,
    posts,
    loadingPosts,
  };
});
