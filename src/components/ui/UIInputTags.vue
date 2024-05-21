<template>
  <label class="flex w-full flex-col">
    <span class="mb-2 text-sm font-medium text-blue-gray-900">
      {{ label }}
    </span>

    <div class="relative">
      <input
        v-model="currentTag"
        type="text"
        class="input"
        autocomplete="off"
        :class="{
          'input--invalid': invalid,
        }"
        :style="`padding-left: ${paddingTagsList}px;`"
        :placeholder="currentTag.length === 0 && tags.length === 0 ? 'Теги' : ''"
        @keydown.enter="addTag"
      />

      <div
        class="absolute left-2 top-1/2 flex -translate-y-1/2 items-center gap-2"
        ref="tagsList"
      >
        <div
          v-for="tag in tags"
          :key="getLatinFromCyrillic(tag)"
          class="flex items-center justify-center gap-1 rounded-md bg-blue-gray-50 px-2 py-1"
        >
          <span class="text-xs font-bold text-gray-900">{{ tag }}</span>
          <button @click="deleteTag(tag)">
            <svg class="h-5 w-5">
              <use xlink:href="@/assets/icons/sprites/btns.svg#close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </label>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';
import { getLatinFromCyrillic } from '@/helpers/getLatinFromCyrillic';

interface IProps {
  label: string;
  invalid?: boolean;
  tags: string[];
}

interface IEmits {
  (e: 'update:tags', tags: string[]): void;
}

defineProps<IProps>();
const emit = defineEmits<IEmits>();

const tagsList = ref<HTMLDivElement>();
const paddingTagsList = ref<number>(16);
const currentTag = ref<string>('');
const inputTags = ref<string[]>([]);

function setPaddingLeft(target?: HTMLInputElement) {
  setTimeout(() => {
    if (tagsList.value) {
      paddingTagsList.value = tagsList.value.clientWidth + 16;
    }

    if (target) {
      target.focus();
    }
  }, 10);
}

function addTag(event: Event) {
  const target = event.target as HTMLInputElement;

  if (currentTag.value.length) {
    inputTags.value.push(currentTag.value);
    currentTag.value = '';
    emit('update:tags', inputTags.value);
    setPaddingLeft(target);
  }
}

function deleteTag(tag: string) {
  inputTags.value = inputTags.value.filter(item => tag !== item);
  emit('update:tags', inputTags.value);
  setPaddingLeft();
}
</script>
