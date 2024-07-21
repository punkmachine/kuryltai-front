<template>
  <div class="relative flex items-center gap-2 rounded-lg border border-solid border-blue-gray-100 p-3.5">
    <div class="flex items-center">
      <svg class="h-9 w-9">
        <use xlink:href="@/assets/icons/sprites/inputs.svg#file"></use>
      </svg>
    </div>
    <div class="flex-1">
      <p class="text-xs font-medium text-gray-900">{{ name }}</p>
    </div>

    <!-- New download button with img element for the icon -->
    <button
      @click.stop="downloadFile"
      class="absolute right-10 top-1/2 transform -translate-y-1/2 flex items-center justify-center"
      style="width: 24px; height: 24px;"
    >
      <img src="@/assets/images/download.png" alt="Download" class="h-6 w-6" />
    </button>

    <button
      v-if="withDelete"
      @click.stop="$emit('delete')"
      class="absolute right-2 top-2 fill-slate-300"
    >
      <svg class="h-6 w-6 rotate-45">
        <use xlink:href="@/assets/icons/sprites/btns.svg#add"></use>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';

interface IProps {
  src: string;
  name: string;
  withDelete?: boolean;
}

interface IEmits {
  (e: 'delete'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const downloadFile = () => {
  const link = document.createElement('a');
  link.href = props.src;
  link.download = props.name;
  link.click();
};
</script>

<style scoped>
button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
}

button img {
  display: block;
  margin: auto;
}
</style>
