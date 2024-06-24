<template>
  <section class="profile">
    <ProfileHead @show-donate="visibleDonateModal = true" />
    <!-- @subscribe-user="subscribeUser" -->

    <section class="profile__content">
      <div class="profile__posts">
        <FullPost
          v-for="post in userPosts"
          :key="post.id"
          :name="post.profile.username"
          :date="post.created"
          :avatar="post.profile.avatar_image"
          :heading="post.title"
          :text="post.description"
          :has-access="post.have_access"
          :images="post.contents.image?.map((item: any) => item.value)"
          :videos="post.contents.video?.files?.map((item: any) => item.value)"
          :audios="post.contents.audio?.map((item: any) => item.value)"
          :files="post.contents.document?.map((item: any) => item.value)"
          :you-tubes="post.contents.video?.urls.map((item: any) => item.value)"
          :tags="post.tags"
          :likes="post.likes_count"
        />
      </div>

      <div class="subscriptions">
        <SubscriptionsCard
          v-for="membership in currentUserMemberships"
          :key="membership.id"
          :title="`${membership.monthly_price.slice(0, -3)} ₸`"
          :subtitle="membership.name"
          is-full
          :active="Boolean(membership.active_subscription)"
          :valid-until="membership.active_subscription?.end_date"
          :description="membership.membership_description"
          @subscribe="subscribeClick(membership.id)"
        />
      </div>
    </section>

    <DonateModal
      :visible-donate-modal="visibleDonateModal"
      @close="visibleDonateModal = false"
      @send-donate="createDonate"
    />

    <SubscribeModal
      :visible-subscribe-modal="visibleSubscribeModal"
      :subscribed-membership-id="subscribedMembership"
      @close="subscribeModalClose"
      @subscribe="subscribe"
    />

    <SecureForm
      v-if="secureData"
      :secure-data="secureData"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { toast } from 'vue3-toastify';

import { api } from '@/api';
import { useUsersStore, useMyProfileStore } from '@/store';

import { useLoadScript } from '@/composables/useLoadScript';

import FullPost from '@/components/post/FullPost.vue';
import ProfileHead from '@/components/ProfileHead.vue';
import SubscriptionsCard from '@/components/subscriptions/SubscriptionsCard.vue';
import SubscribeModal from './components/SubscribeModal.vue';
import DonateModal from './components/DonateModal.vue';
import SecureForm from '@/components/SecureForm';

const route = useRoute();
const usersStore = useUsersStore();
const myProfileStore = useMyProfileStore();

const { currentUserMemberships, currentUser, userPosts } = storeToRefs(usersStore);

const { loadScript } = useLoadScript();

const visibleDonateModal = ref(false);
const visibleSubscribeModal = ref(false);
const subscribedMembership = ref<any>(null);
const secureData = ref<any>(JSON.parse(localStorage.getItem('secureData') || '{}'));

const slug = ref<string>('');
let checkout: any = null;

// function subscribeUser() {
//   api.profile.toggleFollowProfile(slug.value)
//     .then(data => {
//       usersStore.fetchUser(slug.value);
//     });
// }

function initPayment() {
  // @ts-ignore
  checkout = new cp.Checkout({
    publicId: import.meta.env.VITE_APP_CRYPTO_KEY,
  });
}

async function createCryptogram(cardData: any) {
  const fieldValues = {
    cvv: cardData.cvc,
    cardNumber: cardData.number,
    expDateMonth: cardData.date.slice(0, 2),
    expDateYear: cardData.date.slice(3),
  };

  return checkout.createPaymentCryptogram(fieldValues);
}

function createDonateBySavedCard(data: any) {
  api.payments.makeDonate({
    card_uuid: data.cardId,
    amount: data.sum,
    currency: 'KZT',
    membership_id: null,
    profile_uuid: currentUser.value.profile_uuid,
  });
}

// eslint-disable-next-line max-lines-per-function
function getPayloadForNewCard(data: any, cryptogram: string, isMembership?: boolean) {
  let result = {
    cryptogram,
    amount: data.sum || currentUserMemberships.value.find(item => item.id === subscribedMembership.value).monthly_price,
    currency: 'KZT',
    profile_uuid: currentUser.value.profile_uuid,
    name: currentUser.value.username,
    is_save_card: false,
  };

  if (isMembership) {
    // @ts-ignore
    result.membership_id = subscribedMembership.value;
  }

  return result;
}

// eslint-disable-next-line
function donateByNewCardCallback(data: any) {
  if (data.success) {
    toast.success('Успешно!');
    myProfileStore.fetchMyCards();
  } else if (data.is_3d_secure) {
    secureData.value = {
      MD: data.MD,
      PaReq: data.PaReq,
      AcsUrl: `${data.AcsUrl}-get`,
    };

    localStorage.setItem('secureData', JSON.stringify(secureData.value));
    window.open(
      `${data.AcsUrl}-get?MD=${data.MD}&PaReq=${data.PaReq}&TermUrl=http://kuryltai.kz/api/v0/payments/complete-3d-secure/`,
      '_self',
    );
  } else if (data.error) {
    toast.error(data.error);
  } else {
    toast.error('Произошла ошибка при донате');
  }
}

function createDonateByNewCard(data: any, cryptogram: string) {
  api.payments
    .makeDonate(getPayloadForNewCard(data, cryptogram))
    .then(donateByNewCardCallback)
    .finally(() => {
      visibleDonateModal.value = false;
    });
}

async function donateByNewCardWrapper(data: any) {
  const cryptogram = await createCryptogram(data.cardData);

  if (!cryptogram) throw 'Error Payment';

  createDonateByNewCard(data, cryptogram);
}

async function createDonate(data: any, type: 'token' | 'cryptogram') {
  try {
    if (type === 'cryptogram') {
      await donateByNewCardWrapper(data);
    } else {
      createDonateBySavedCard(data);
    }
  } catch (error) {
    // @ts-ignore
    toast.error(error);
  }
}

function fetchersData() {
  usersStore.fetchUser(slug.value);
  usersStore.fetchMemberships(slug.value);
  usersStore.fetchUserPosts(slug.value, 1);
}

function subscribeClick(membershipId: number) {
  visibleSubscribeModal.value = true;
  subscribedMembership.value = membershipId;
}

function subscribeModalClose() {
  visibleSubscribeModal.value = false;
  subscribedMembership.value = null;
}

function subscribeBySavedCard(data: any) {
  api.payments.makeMembership({
    card_uuid: data.cardId,
    amount: data.sum ?? currentUserMemberships.value.find(item => item.id === subscribedMembership.value).monthly_price,
    currency: 'KZT',
    membership_id: subscribedMembership.value,
    profile_uuid: currentUser.value.profile_uuid,
    is_save_card: false,
  });
}

function subscribeByNewCard(data: any, cryptogram: string) {
  api.payments
    .makeMembership(getPayloadForNewCard(data, cryptogram, true))
    .then(donateByNewCardCallback)
    .finally(() => {
      visibleDonateModal.value = false;
    });
}

// eslint-disable-next-line id-length
async function subscribeByNewCardWrapper(data: any) {
  const cryptogram = await createCryptogram(data);

  if (!cryptogram) throw 'Error Payment';

  subscribeByNewCard(data, cryptogram);
}

async function subscribe(data: any, type: 'token' | 'cryptogram') {
  try {
    if (type === 'cryptogram') {
      await subscribeByNewCardWrapper(data);
    } else {
      subscribeBySavedCard(data);
    }
  } catch (error) {
    // @ts-ignore
    toast.error(error);
  }
}

onMounted(() => {
  loadScript('https://checkout.cloudpayments.ru/checkout.js');
  myProfileStore.fetchMyCards();

  setTimeout(() => {
    initPayment();
  }, 2000);

  slug.value = Array.isArray(route.params.slug) ? route.params.slug[0] : route.params.slug;
  fetchersData();
});
</script>

<style scoped>
.profile__content {
  @apply mt-5 grid gap-x-5;

  grid-template-columns: 2fr 1fr;
}

.profile__posts {
  @apply flex w-full flex-col gap-5 pb-5;
}

.subscriptions {
  @apply flex flex-col gap-5;
}
</style>
