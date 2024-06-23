<template>
  <div class="relative">
    <iframe
      width="100%"
      height="300"
      :src="link"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></iframe>

    <button
      v-if="withDelete"
      @click="$emit('delete')"
      class="absolute right-2 top-2 fill-slate-300"
    >
      <svg class="h-6 w-6 rotate-45">
        <use xlink:href="@/assets/icons/sprites/btns.svg#add"></use>
      </svg>
    </button>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, defineEmits } from 'vue';

interface IProps {
  src: string;
  withDelete?: boolean;
}

interface IEmits {
  (e: 'delete'): void;
}

const props = defineProps<IProps>();
defineEmits<IEmits>();

const link = computed(() => {
  let id = null;

  if (props.src.includes('youtu.be')) {
    id = props.src.replace('https://youtu.be/', '').split('?')[0];
  } else if (props.src.includes('watch')) {
    id = props.src.replace('https://www.youtube.com/watch?v=', '');
  } else if (props.src.includes('embed')) {
    id = props.src.replace('https://www.youtube.com/embed/', '').split('?')[0];
  }

  return `https://www.youtube.com/embed/${id}`;
});
</script>

<style scoped></style>
