<template>
  <UIModal
    :visible="visibleCancelSubs"
    class="w-108"
    @close="$emit('close')"
  >
    <template #header>
      <h3 class="text-xl font-bold text-gray-900">Отменить подписку?</h3>
    </template>

    <template #body>
      <div class="flex flex-col gap-3.5 text-base text-blue-gray-500">
        <p>
          Текущая подписка будет действовать до даты окончания 30.04.2024, после чего вы потеряете доступ к закрытым
          постам автора Ильдар АвтоПодбор.
        </p>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center gap-3">
        <button
          class="btn shadow-none"
          @click="cancelSubscribe"
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
  visibleCancelSubs: boolean;
}

interface IEmits {
  (e: 'close'): void;
  (e: 'cancel-subscribe'): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

function cancelSubscribe() {
  emit('cancel-subscribe');
}
</script>
