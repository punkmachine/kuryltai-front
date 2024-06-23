<template>
  <teleport
    to="body"
    :disabled="visible"
  >
    <div v-if="visible">
      <div
        class="overlay"
        @click="$emit('close')"
      ></div>

      <article
        v-bind="$attrs"
        class="modal"
      >
        <div
          class="fixed right-4 top-4 cursor-pointer"
          @click="$emit('close')"
        >
          <svg class="h-6 w-6">
            <use xlink:href="@/assets/icons/sprites/btns.svg#close"></use>
          </svg>
        </div>

        <div class="modal__header">
          <slot name="header"></slot>
        </div>

        <div class="modal__body">
          <slot name="body"></slot>
        </div>

        <div
          v-if="$slots.footer"
          class="modal__footer"
        >
          <slot name="footer"></slot>
        </div>
      </article>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

interface IProps {
  visible: boolean;
}

interface IEmits {
  (e: 'close'): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>

<style scoped>
.overlay {
  @apply fixed left-0 top-0 z-40 h-screen w-screen bg-black opacity-30;
}

.modal {
  @apply fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-7 rounded-lg bg-white px-5 py-6;
}
</style>
