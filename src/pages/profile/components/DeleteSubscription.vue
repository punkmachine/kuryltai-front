<template>
  <UIModal
    :visible="visibleDeleteSubscription"
    class="w-108"
    @close="$emit('close')"
  >
    <template #header>
      <h3 class="text-xl font-bold text-gray-900">Удалить подписку?</h3>
    </template>

    <template #body>
      <div class="flex flex-col gap-3.5 text-base text-blue-gray-500">
        <p>Данная подписка будет удалена и не будет доступна для покупки.</p>
        <p>
          Действующие подписчики будут иметь доступ к контенту до даты следующего списания. Далее подписка будет
          недоступно.
        </p>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center gap-3">
        <button
          class="btn shadow-none"
          @click="deleteSubscription"
        >
          Подтвердить
        </button>

        <button
          class="btn btn--primary"
          @click="$emit('close')"
        >
          Оставить подписку
        </button>
      </div>
    </template>
  </UIModal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import UIModal from '@/components/ui/UIModal.vue';

interface IProps {
  visibleDeleteSubscription: boolean;
}

interface IEmits {
  (e: 'close'): void;
  (e: 'delete-subscription'): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

function deleteSubscription() {
  emit('delete-subscription');
}
</script>
