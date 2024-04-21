<template>
  <label class="flex w-full flex-col">
    <span
      v-if="label"
      class="mb-2 text-sm font-medium text-blue-gray-900"
      >{{ label }}</span
    >
    <div class="relative">
      <input
        type="text"
        v-bind="$attrs"
        class="input"
        :class="{
          'input--invalid': invalid,
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
  label?: string;
  modelValue: string;
  invalid?: boolean;
}

interface IEmits {
  (e: 'update:modelValue', newValue: string): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>
