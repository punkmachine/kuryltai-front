<template>
  <UIModal
    :visible="visibleEditSubscription"
    class="w-108"
    @close="$emit('close')"
  >
    <template #header>
      <h3 class="text-center text-xl font-bold text-gray-900">Редактировать подписку</h3>
    </template>

    <template #body>
      <div class="flex flex-col gap-3.5">
        <UIInput
          v-model="editSubscriptionData.name"
          required
          autocomplete="off"
          placeholder="Название"
          label="Название подписки"
        />

        <UIInput
          v-model="editSubscriptionData.description"
          is-textarea
          required
          autocomplete="off"
          placeholder="Описание"
          label="Описание подписки"
        />

        <UIInput
          v-model="editSubscriptionData.sum"
          required
          autocomplete="off"
          placeholder="Сумма"
          label="Стоимость подписки, тг."
        />
      </div>
    </template>

    <template #footer>
      <button
        @click="updateSubscription"
        class="btn w-full uppercase"
        :class="{
          'btn--secondary': !validData,
          'btn--primary': validData,
        }"
      >
        Сохранить
      </button>
    </template>
  </UIModal>
</template>

<script lang="ts" setup>
import { reactive, defineProps, defineEmits, computed } from 'vue';
import UIModal from '@/components/ui/UIModal.vue';
import UIInput from '@/components/ui/UIInput.vue';
import type { IEditSubscriptionData } from '../types';

interface IProps {
  visibleEditSubscription: boolean;
}

interface IEmits {
  (e: 'close'): void;
  (e: 'update-subscription', data: IEditSubscriptionData): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const editSubscriptionData = reactive<IEditSubscriptionData>({
  name: '',
  description: '',
  sum: '',
});

const validData = computed(() => {
  return editSubscriptionData.name.length && editSubscriptionData.description.length && editSubscriptionData.sum.length;
});

function updateSubscription() {
  emit('update-subscription', editSubscriptionData);
}
</script>
