/* eslint-disable max-lines-per-function */

import { ref } from 'vue';
import { defineStore } from 'pinia';

import { api } from '@/api';

export const useMyProfileStore = defineStore('my-profile', () => {
  const profile = ref<any>(null);
  const profileCards = ref<any[]>([]);
  const myMemberships = ref<any[]>([]);
  const posts = ref<any[]>([]);

  function fetchMyProfile(callback?: () => void) {
    api.profile
      .getMyProfile()
      .then(data => {
        profile.value = data;
      })
      .then(() => {
        if (callback) {
          callback();
        }
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

  function fetchMyPosts(page: number = 1) {
    api.posts.getMyPosts(page).then(data => {
      if (page > 1) {
        posts.value = [...posts.value, ...data.results];
      } else {
        posts.value = data.results;
      }
    });
  }

  function deletePostInStore(id: number) {
    posts.value = posts.value.filter(post => post.id !== id);
  }

  return {
    fetchMyProfile,
    fetchMyCards,
    fetchMyMemberships,
    fetchMyPosts,
    deletePostInStore,
    profile,
    profileCards,
    myMemberships,
    posts,
  };
});
