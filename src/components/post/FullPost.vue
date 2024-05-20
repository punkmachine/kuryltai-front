<template>
  <article class="post">
    <PostHead
      :name="name"
      :date="date"
      :avatar="avatar"
      :is-my-post="isMyPost"
      @delete-post="$emit('delete-post')"
    />

    <div class="mb-4">
      <h3 class="text-xl font-medium text-gray-900">{{ heading }}</h3>
    </div>

    <div
      class="post__content"
      :class="{
        'post__content--full': fullContentVisible,
        'post__content--no-access': !hasAccess,
      }"
    >
      <div
        v-if="images?.length"
        class="mb-6 flex flex-col gap-2"
      >
        <UIImage
          v-for="image in images"
          :key="image"
          :src="image"
        />
      </div>

      <div
        v-if="audios?.length"
        class="flex flex-col gap-2"
      >
        <UIAudio
          v-for="audio in audios"
          :key="audio"
          :file-name="audio.split('/')[audio.split('/').length]"
          :src="audio"
        />
      </div>

      <div
        v-if="videos?.length"
        class="mt-6 flex flex-col gap-2"
      >
        <UIVideo src="/demo/demo.mp4" />
      </div>

      <div
        v-if="text"
        class="my-6 text-sm text-gray-900"
      >
        {{ text }}
      </div>

      <button
        class="post__content-full-btn"
        :class="{
          '!hidden': fullContentVisible,
        }"
        @click="fullContentVisible = true"
      >
        Показать полностью
      </button>

      <SubscriptionsCard
        v-if="!hasAccess"
        title="Меценат"
        subtitle="Нужен уровень подписки"
        class="!absolute left-1/2 top-1/2 w-80 -translate-x-1/2 -translate-y-1/2"
      />
    </div>

    <div
      v-if="tags?.length"
      class="mt-6 flex flex-wrap items-center gap-2 border-b border-solid border-blue-gray-100 pb-3.5 pl-3"
    >
      <UITag
        v-for="tag in tags"
        :key="tag"
      >
        {{ tag }}
      </UITag>
    </div>

    <div class="mt-3 flex items-center gap-6">
      <button class="flex items-center gap-1">
        <svg class="h-5 w-5">
          <use xlink:href="@/assets/icons/sprites/btns.svg#heart"></use>
        </svg>

        <span class="text-sm text-gray-900"> 2345 </span>
      </button>
    </div>
  </article>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';
import UIImage from '@/components/ui/UIImage.vue';
import UIAudio from '@/components/ui/UIAudio.vue';
import UIVideo from '@/components/ui/UIVideo.vue';
import UITag from '@/components/ui/UITag.vue';
import PostHead from '@/components/post/PostHead.vue';
import SubscriptionsCard from '@/components/subscriptions/SubscriptionsCard.vue';

interface IProps {
  name: string;
  date: string;
  avatar: string;
  heading: string;
  images?: string[];
  videos?: string[];
  audios?: string[];
  text?: string;
  tags?: string[];
  hasAccess?: boolean;
  isMyPost?: boolean;
}

interface IEmits {
  (e: 'delete-post'): void;
}

defineProps<IProps>();
defineEmits<IEmits>();

const fullContentVisible = ref(false);
</script>

<style scoped>
.post {
  @apply rounded-lg bg-white px-6 py-3 shadow-standard;
}

.post__content {
  @apply relative flex max-h-96 flex-col overflow-hidden;
}

.post__content--full {
  @apply max-h-max;
}

.post__content-full-btn {
  @apply absolute bottom-0 left-0 flex h-20 w-full cursor-pointer items-end justify-start pl-2 text-sm text-purple-800 hover:text-purple-900;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #fff 66%, #fff 100%);
}

.post__content--no-access > div:first-child {
  @apply rounded-lg blur-md;
}

.post__content--no-access .post__content-full-btn {
  @apply hidden;
}
</style>
