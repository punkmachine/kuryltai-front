<template>
  <UIModal
    :visible="visibleAddSubscription"
    class="w-108"
    @close="$emit('close')"
  >
    <template #header>
      <h3 class="text-center text-xl font-bold text-gray-900">Создать подписку</h3>
    </template>

    <template #body>
      <div class="flex flex-col gap-3.5">
        <UIInput
          v-model="addSubscriptionData.name"
          required
          autocomplete="off"
          placeholder="Название"
          label="Название подписки"
        />

        <UIInput
          v-model="addSubscriptionData.description"
          is-textarea
          required
          autocomplete="off"
          placeholder="Описание"
          label="Описание подписки"
        />

        <UIInput
          v-model="addSubscriptionData.sum"
          required
          autocomplete="off"
          placeholder="Сумма"
          label="Стоимость подписки, тг."
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
        Создать
      </button>
    </template>
  </UIModal>
</template>

<script lang="ts" setup>
import { reactive, defineProps, defineEmits, computed } from 'vue';
import UIModal from '@/components/ui/UIModal.vue';
import UIInput from '@/components/ui/UIInput.vue';
import type { IAddSubscriptionData } from '../types';

interface IProps {
  visibleAddSubscription: boolean;
}

interface IEmits {
  (e: 'close'): void;
  (e: 'add-subscription', data: IAddSubscriptionData): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const addSubscriptionData = reactive<IAddSubscriptionData>({
  name: '',
  description: '',
  sum: '',
});

const validData = computed(() => {
  return addSubscriptionData.name.length && addSubscriptionData.description.length && addSubscriptionData.sum.length;
});

function createSubscription() {
  emit('add-subscription', addSubscriptionData);
}
</script>
