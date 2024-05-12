<template>
  <label class="flex w-full flex-col">
    <span
      v-if="label"
      class="mb-2 text-sm font-medium text-blue-gray-900"
    >
      {{ label }}
    </span>

    <div class="relative">
      <div
        class="select"
        v-bind="$attrs"
        :data-value="modelValue"
        :class="{
          'select--invalid': invalid,
        }"
        @click="showOptions = !showOptions"
      >
        <span
          v-if="!selectedValue"
          class="text-sm text-blue-gray-300"
        >
          {{ placeholder }}
        </span>

        <span
          v-else
          class="text-sm text-blue-gray-900"
        >
          {{ options.find(option => option.value === selectedValue)?.label }}
        </span>

        <svg class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2">
          <use xlink:href="@/assets/icons/sprites/btns.svg#arrow"></use>
        </svg>
      </div>

      <div
        class="top-15 absolute z-10 w-full flex-col rounded-md bg-white p-3 shadow-xl"
        :class="{
          flex: showOptions,
          hidden: !showOptions,
        }"
      >
        <div
          v-for="option in options"
          :key="option.value"
          class="cursor-pointer rounded-md p-3.5 text-sm font-medium text-blue-gray-500 hover:bg-blue-gray-50"
          :class="{
            'bg-blue-gray-50': selectedValue === option.value,
          }"
          @click="selectedValue = option.value"
        >
          {{ option.label }}
        </div>

        <button class="rounded-md p-3.5 text-left text-sm font-medium text-blue-gray-500 hover:bg-blue-gray-50">
          + Добавить карту
        </button>
      </div>
    </div>
  </label>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, ref, watch, onMounted } from 'vue';

interface IProps {
  label?: string;
  placeholder: string;
  modelValue: string;
  invalid?: boolean;
  options: {
    label: string;
    value: string;
  }[];
}

interface IEmits {
  (e: 'update:modelValue', newValue: string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const showOptions = ref(false);
const selectedValue = ref('');

watch(
  () => selectedValue.value,
  () => {
    emit('update:modelValue', selectedValue.value);
    showOptions.value = false;
  },
);

onMounted(() => {
  selectedValue.value = props.modelValue;
});
</script>
