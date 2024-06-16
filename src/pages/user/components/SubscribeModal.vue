<template>
  <UIModal
    :visible="visibleSubscribeModal"
    class="w-108"
    @close="$emit('close')"
  >
    <template #header>
      <h3 class="text-center text-xl font-bold text-gray-900">
        {{ currentMembership.name }}
      </h3>
    </template>

    <template #body>
      <p class="break-all text-center text-base text-blue-gray-500">
        {{ currentMembership.membership_description }}
      </p>

      <h3 class="mt-7 text-center text-xl font-bold text-gray-900">Способ оплаты</h3>

      <div
        v-if="cardsExist"
        class="flex flex-col gap-3.5"
      >
        <UISelect
          v-model="subscribeData.cardId"
          label="Выберите карту"
          placeholder="Выберите карту"
          :options="
            profileCards.map(card => ({
              label: getFormatCardNumber(card.card_number),
              value: card.card_uuid,
            }))
          "
        />
      </div>

      <AddFormCard
        v-else
        :initial-card-data="subscribeDataWithNewCard"
        @update-card-data="cardData => (subscribeDataWithNewCard = cardData)"
        class="flex flex-col gap-3.5"
      />
    </template>

    <template #footer>
      <button
        @click="createSubscription"
        class="btn w-full uppercase"
        :class="{
          'btn--secondary': !validData,
          'btn--primary': validData,
        }"
      >
        Подписаться
      </button>
    </template>
  </UIModal>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { useUsersStore } from '@/store';
import { useMyProfileStore } from '@/store';

import UIModal from '@/components/ui/UIModal.vue';
import UISelect from '@/components/ui/UISelect.vue';
import AddFormCard from '@/components/AddFormCard.vue';

import { getFormatCardNumber } from '@/helpers/getFormatCardNumber';

import type { ISubscribeWithNewCard, ISubscribeWithCard } from '../types';

interface IProps {
  visibleSubscribeModal: boolean;
  subscribedMembershipId: number;
}

interface IEmits {
  (e: 'close'): void;
  (e: 'subscribe', data: ISubscribeWithCard | ISubscribeWithNewCard, type: 'token' | 'cryptogram'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const userStore = useUsersStore();
const profileStore = useMyProfileStore();
const { currentUserMemberships } = storeToRefs(userStore);
const { profileCards } = storeToRefs(profileStore);

const subscribeData = ref<ISubscribeWithCard>({
  cardId: '',
});

const subscribeDataWithNewCard = ref<ISubscribeWithNewCard>({
  name: '',
  number: '',
  cvc: '',
  date: '',
});

const validData = computed(() => {
  if (cardsExist.value) {
    return subscribeData.value.cardId.length;
  } else {
    return (
      subscribeDataWithNewCard.value.name.length > 1 &&
      subscribeDataWithNewCard.value.cvc.length === 3 &&
      subscribeDataWithNewCard.value.number.length === 19 &&
      subscribeDataWithNewCard.value.date.length === 5
    );
  }
});

const cardsExist = computed(() => profileCards.value.length > 0);

const currentMembership = computed(() =>
  currentUserMemberships.value.find(item => item.id === props.subscribedMembershipId),
);

function createSubscription() {
  if (cardsExist.value) {
    emit('subscribe', subscribeData.value, 'token');
  } else {
    emit('subscribe', subscribeDataWithNewCard.value, 'cryptogram');
  }
}
</script>
