<template>
  <article class="flex flex-col gap-3 rounded-xl bg-white p-6 text-center">
    <p
      class="text-gray-900"
      :class="{
        'text-xs font-medium': !isFull,
        'text-sm font-semibold': isFull,
      }"
    >
      {{ subtitle }}
    </p>

    <h4 class="text-2xl font-semibold text-gray-900">{{ title }}</h4>

    <p
      class="text-xs text-gray-900"
      v-if="isFull"
    >
      в месяц
    </p>

    <button
      v-if="isMy"
      class="btn btn--primary uppercase"
      @click="$emit('edit-subscription')"
    >
      Редактировать
    </button>
    <button
      v-else-if="!active"
      class="btn btn--primary uppercase"
    >
      Подписаться
    </button>
    <button
      v-else
      class="btn btn--secondary"
    >
      Действует до {{ readableDate }}
    </button>

    <p
      v-if="description"
      class="text-left text-sm text-gray-900"
    >
      {{ description }}
    </p>
  </article>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed } from 'vue';
import dayjs from 'dayjs';

interface IProps {
  title: string;
  subtitle: string;
  description?: string;
  active?: boolean;
  isFull?: boolean;
  isMy?: boolean;
  validUntil?: string;
}

interface IEmits {
  (e: 'edit-subscription'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const readableDate = computed(() => {
  if (props.validUntil) {
    return dayjs(props.validUntil).format('DD.MM.YYYY');
  }

  return '';
});
</script>
