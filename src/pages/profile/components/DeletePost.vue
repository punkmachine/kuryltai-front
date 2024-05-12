<template>
  <UIModal
    :visible="visibleDeletePost"
    class="w-108"
    @close="$emit('close')"
  >
    <template #header>
      <h3 class="text-xl font-bold text-gray-900">Удалить пост?</h3>
    </template>

    <template #body>
      <div class="flex flex-col gap-3.5 text-base text-blue-gray-500">
        <p>Данный пост будет удален и не будет доступен для просмотра.</p>
      </div>
    </template>

    <template #footer>
      <div class="flex items-center gap-3">
        <button
          class="btn shadow-none"
          @click="deletePost"
        >
          Подтвердить
        </button>

        <button
          class="btn btn--primary"
          @click="$emit('close')"
        >
          Оставить пост
        </button>
      </div>
    </template>
  </UIModal>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import UIModal from '@/components/ui/UIModal.vue';

interface IProps {
  visibleDeletePost: boolean;
}

interface IEmits {
  (e: 'close'): void;
  (e: 'delete-post'): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

function deletePost() {
  emit('delete-post');
}
</script>
