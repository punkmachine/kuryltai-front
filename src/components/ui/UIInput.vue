<template>
  <label class="flex flex-col w-full">
    <span class="text-sm font-medium text-blue-gray-900 mb-2">{{ label }}</span>
    <div class="relative">
      <input
        type="text"
        v-bind="$attrs"
        class="input"
        :class="{
          'input--invalid': invalid
        }"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <slot name="inner-icon-right"></slot>
    </div>
  </label>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps } from 'vue';

interface IProps {
  label: string,
  modelValue: string;
  invalid?: boolean,
}

interface IEmits {
  (e: 'update:modelValue', newValue: string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();
</script>
