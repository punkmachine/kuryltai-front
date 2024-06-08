<template>
  <div>
    <UIInput
      v-model="cardData.number"
      v-mask="'#### #### #### ####'"
      label="Номер карты"
      placeholder="0000 0000 0000 0000"
      required
    />

    <div class="flex items-center gap-3">
      <UIInput
        v-model="cardData.date"
        v-mask="'##/##'"
        label="Срок действия"
        placeholder="00/00"
        required
      />

      <UIInput
        v-model="cardData.cvc"
        v-mask="'###'"
        label="CVC"
        placeholder="000"
        required
      />
    </div>

    <UIInput
      v-model="cardData.name"
      label="Имя на карте"
      placeholder="Имя"
      required
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps, onMounted, toRaw } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';
import type { ICard } from '@/entities/types/types';

interface IProps {
  initialCardData: ICard;
}

interface IEmits {
  (e: 'update-card-data', data: ICard): void;
}

const emit = defineEmits<IEmits>();
const props = defineProps<IProps>();

const cardData = ref<ICard>({
  name: '',
  cvc: '',
  date: '',
  number: '',
});

watch(
  () => cardData,
  () => {
    emit('update-card-data', cardData.value);
  },
);

watch(
  () => props.initialCardData,
  () => {
    if (toRaw(cardData.value) !== toRaw(props.initialCardData)) {
      cardData.value = props.initialCardData;
    }
  },
);

onMounted(() => {
  cardData.value = props.initialCardData;
});
</script>
