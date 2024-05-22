<template>
  <div>
    <template v-if="cardsExist">
      <UIInput
        v-model="createPaymentWithCard.sum"
        label="Введите сумму, тг."
        placeholder="Сумма"
        required
        autocomplete="off"
      />

      <h3 class="mt-7 text-center text-xl font-bold text-gray-900">Способ оплаты</h3>

      <UISelect
        v-model="createPaymentWithCard.cardId"
        label="Выберите карту"
        placeholder="Выберите карту"
        :options="[
          {
            label: '1234 43** **** 4342',
            value: '1',
          },
          {
            label: '1234 43** **** 4342',
            value: '2',
          },
        ]"
      />
    </template>

    <template v-else>
      <UIInput
        v-model="createPaymentWithNewCard.sum"
        label="Введите сумму, тг."
        placeholder="Сумма"
        required
        autocomplete="off"
      />

      <h3 class="mt-7 text-center text-xl font-bold text-gray-900">Способ оплаты</h3>

      <AddFormCard
        class="flex flex-col gap-3.5"
        :initial-card-data="createPaymentWithNewCard.cardData"
        @update-card-data="cardData => (createPaymentWithNewCard.cardData = cardData)"
      />
    </template>

    <button
      @click="createPayment"
      class="btn mt-4 w-full uppercase"
      :class="{
        'btn--secondary': !validData,
        'btn--primary': validData,
      }"
    >
      Оплатить
    </button>
  </div>
</template>

<script lang="ts" setup>
import { reactive, computed, defineEmits } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';
import UISelect from '@/components/ui/UISelect.vue';
import AddFormCard from '@/components/AddFormCard.vue';
import type { ICreatePaymentWithCard, ICreatePaymentWithNewCard } from '../types';

interface IEmits {
  (e: 'create-payment', data: ICreatePaymentWithCard | ICreatePaymentWithNewCard): void;
}

const emit = defineEmits<IEmits>();

const createPaymentWithCard = reactive<ICreatePaymentWithCard>({
  sum: '',
  cardId: '',
});

const createPaymentWithNewCard = reactive<ICreatePaymentWithNewCard>({
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
    return createPaymentWithCard.cardId && createPaymentWithCard.sum;
  } else {
    return validatePaymentNewCard();
  }
});

const cardsExist = computed(() => false);

function createPayment() {
  if (cardsExist.value) {
    emit('create-payment', createPaymentWithCard);
  } else {
    emit('create-payment', createPaymentWithNewCard);
  }
}

function validatePaymentNewCard() {
  return (
    createPaymentWithNewCard.cardData.name &&
    createPaymentWithNewCard.cardData.cvc &&
    createPaymentWithNewCard.cardData.date &&
    createPaymentWithNewCard.cardData.number &&
    createPaymentWithNewCard.sum
  );
}
</script>
