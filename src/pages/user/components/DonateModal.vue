<template>
  <UIModal
    :visible="visibleDonateModal"
    class="w-108"
    @close="closeModal"
  >
    <template #header>
      <h3 class="text-center text-xl font-bold text-gray-900">Отправить донат</h3>
    </template>

    <template #body>
      <div
        v-if="cardsExist"
        class="flex flex-col gap-3.5"
      >
        <UIInput
          v-model="donateDataWithCard.sum"
          label="Введите сумму, тг."
          placeholder="Сумма"
          required
          autocomplete="off"
        />

        <h3 class="mt-7 text-center text-xl font-bold text-gray-900">Способ оплаты</h3>

        <UISelect
          v-model="donateDataWithCard.cardId"
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

      <div
        v-else
        class="flex flex-col gap-3.5"
      >
        <UIInput
          v-model="donateDataWithNewCard.sum"
          label="Введите сумму, тг."
          placeholder="Сумма"
          required
          autocomplete="off"
        />

        <h3 class="mt-7 text-center text-xl font-bold text-gray-900">Способ оплаты</h3>

        <AddFormCard
          class="flex flex-col gap-3.5"
          :initial-card-data="donateDataWithNewCard.cardData"
          @update-card-data="cardData => (donateDataWithNewCard.cardData = cardData)"
        />
      </div>
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
        Оплатить
      </button>
    </template>
  </UIModal>
</template>

<script lang="ts" setup>
import { reactive, defineProps, defineEmits, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useMyProfileStore } from '@/store';

import UIModal from '@/components/ui/UIModal.vue';
import UIInput from '@/components/ui/UIInput.vue';
import UISelect from '@/components/ui/UISelect.vue';
import AddFormCard from '@/components/AddFormCard.vue';

import { getFormatCardNumber } from '@/helpers/getFormatCardNumber';

import type { ISendDonateWithCard, ISendDonateWithNewCard } from '../types';

interface IProps {
  visibleDonateModal: boolean;
}

interface IEmits {
  (e: 'close'): void;
  (e: 'send-donate', data: ISendDonateWithCard | ISendDonateWithNewCard, type: 'token' | 'cryptogram'): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const profileStore = useMyProfileStore();
const { profileCards } = storeToRefs(profileStore);

const donateDataWithCard = reactive<ISendDonateWithCard>({
  sum: '',
  cardId: '',
});

const donateDataWithNewCard = reactive<ISendDonateWithNewCard>({
  sum: '',
  cardData: {
    name: '',
    number: '',
    date: '',
    cvc: '',
  },
});

const validData = computed(() => {
  if (cardsExist.value) {
    return donateDataWithCard.cardId && donateDataWithCard.sum;
  } else {
    return validateDonateNewCard();
  }
});

const cardsExist = computed(() => profileCards.value.length > 0);

function createSubscription() {
  if (cardsExist.value) {
    emit('send-donate', donateDataWithCard, 'token');
  } else {
    emit('send-donate', donateDataWithNewCard, 'cryptogram');
  }
}

function validateDonateNewCard() {
  return (
    donateDataWithNewCard.cardData.name.length > 1 &&
    donateDataWithNewCard.cardData.cvc.length === 3 &&
    donateDataWithNewCard.cardData.date.length === 5 &&
    donateDataWithNewCard.cardData.number.length === 19 &&
    donateDataWithNewCard.sum.length > 1
  );
}

function setInitialDonateData() {
  donateDataWithNewCard.sum = '';
  donateDataWithNewCard.cardData.cvc = '';
  donateDataWithNewCard.cardData.date = '';
  donateDataWithNewCard.cardData.name = '';
  donateDataWithNewCard.cardData.number = '';
  donateDataWithCard.cardId = '';
  donateDataWithCard.sum = '';
}

function closeModal() {
  emit('close');
  setInitialDonateData();
}
</script>
