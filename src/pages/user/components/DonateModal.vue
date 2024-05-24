<template>
  <UIModal
    :visible="visibleDonateModal"
    class="w-108"
    @close="$emit('close')"
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
          :last-item="{
            label: '+ Добавить карту',
            click: () => {},
          }"
        />
      </div>

      <div
        v-else
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
import UIModal from '@/components/ui/UIModal.vue';
import UIInput from '@/components/ui/UIInput.vue';
import UISelect from '@/components/ui/UISelect.vue';
import AddFormCard from '@/components/AddFormCard.vue';
import type { ISendDonateWithCard, ISendDonateWithNewCard } from '../types';

interface IProps {
  visibleDonateModal: boolean;
}

interface IEmits {
  (e: 'close'): void;
  (e: 'send-donate', data: ISendDonateWithCard | ISendDonateWithNewCard): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

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

const cardsExist = computed(() => false);

function createSubscription() {
  if (cardsExist.value) {
    emit('send-donate', donateDataWithCard);
  } else {
    emit('send-donate', donateDataWithNewCard);
  }
}

function validateDonateNewCard() {
  return (
    donateDataWithNewCard.cardData.name &&
    donateDataWithNewCard.cardData.cvc &&
    donateDataWithNewCard.cardData.date &&
    donateDataWithNewCard.cardData.number &&
    donateDataWithNewCard.sum
  );
}
</script>
