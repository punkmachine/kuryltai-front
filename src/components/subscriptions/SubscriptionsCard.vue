<template>
  <article class="relative flex flex-col gap-3 rounded-xl bg-white p-6 text-center">
    <div
      v-if="isMy"
      class="absolute right-3 top-3"
    >
      <button
        class="flex h-6 w-6 cursor-pointer items-center justify-center rounded-lg"
        :class="{
          'bg-purple-800': activeOptions,
        }"
        @click="activeOptions = !activeOptions"
      >
        <svg
          class="h-4 w-4 stroke-blue-gray-300"
          :class="{
            'stroke-white': activeOptions,
          }"
        >
          <use xlink:href="@/assets/icons/sprites/btns.svg#dotted"></use>
        </svg>
      </button>

      <div
        class="absolute right-0 top-8 z-10 flex-col gap-1 rounded-lg bg-white p-3 shadow-xl"
        :class="{
          hidden: !activeOptions,
          flex: activeOptions,
        }"
      >
        <button
          class="rounded-md p-2 text-left text-sm font-medium text-blue-gray-500 hover:bg-blue-50"
          @click="$emit('delete-subscriptions')"
        >
          Удалить
        </button>
      </div>
    </div>

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
      @click="$emit('subscribe')"
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
import { defineProps, defineEmits, computed, ref } from 'vue';
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
  (e: 'delete-subscriptions'): void;
  (e: 'subscribe'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const activeOptions = ref(false);

const readableDate = computed(() => {
  if (props.validUntil) {
    return dayjs(props.validUntil).format('DD.MM.YYYY');
  }

  return '';
});
</script>
