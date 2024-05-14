<template>
  <UIModal
    :visible="visibleSubscribeModal"
    class="w-108"
    @close="$emit('close')"
  >
    <template #header>
      <h3 class="text-center text-xl font-bold text-gray-900">Название подписки</h3>
    </template>

    <template #body>
      <p class="text-center text-base text-blue-gray-500">
        Стоимость подписки 2 400 тенге в месяц. Автор хочет писать тексты тут, не отвлекаясь на сторонние заработки. Вы
        можете ему в этом помочь.
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
      </div>

      <AddFormCard
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
        Создать
      </button>
    </template>
  </UIModal>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import UIModal from '@/components/ui/UIModal.vue';
import UISelect from '@/components/ui/UISelect.vue';
import AddFormCard from '@/components/AddFormCard.vue';
import type { ISubscribeWithNewCard, ISubscribeWithCard } from '../types';

interface IProps {
  visibleSubscribeModal: boolean;
}

interface IEmits {
  (e: 'close'): void;
  (e: 'subscribe', data: ISubscribeWithCard | ISubscribeWithNewCard): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

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
      subscribeDataWithNewCard.value.name.length &&
      subscribeDataWithNewCard.value.cvc.length &&
      subscribeDataWithNewCard.value.number.length &&
      subscribeDataWithNewCard.value.date.length
    );
  }
});

const cardsExist = computed(() => false);

function createSubscription() {
  if (cardsExist.value) {
    emit('subscribe', subscribeData.value);
  } else {
    emit('subscribe', subscribeDataWithNewCard.value);
  }
}
</script>
