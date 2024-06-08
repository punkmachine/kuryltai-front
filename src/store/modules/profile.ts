/* eslint-disable max-lines-per-function */

import { ref } from 'vue';
import { defineStore } from 'pinia';

import { api } from '@/api';

export const useMyProfileStore = defineStore('my-profile', () => {
  const profile = ref<any>(null);
  const profileCards = ref<any[]>([]);

  function fetchMyProfile() {
    api.profile.getMyProfile().then(data => {
      profile.value = data;
    });
  }

  function fetchMyCards() {
    api.payments.getPaymentsCards().then(data => {
      profileCards.value = [...data.results];
    });
  }

  return {
    fetchMyProfile,
    fetchMyCards,
    profile,
    profileCards,
  };
});