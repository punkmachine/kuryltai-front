<template>
  <label class="flex w-full flex-col">
    <span
      v-if="label"
      class="mb-2 text-sm font-medium text-blue-gray-900"
    >
      {{ label }}
    </span>
    <div class="relative">
      <div class="absolute left-2 top-1/2 -translate-y-1/2">
        <slot name="inner-icon-left"></slot>
      </div>

      <input
        v-if="!isTextarea"
        type="text"
        v-bind="$attrs"
        class="input"
        :class="{
          'input--invalid': invalid,
          'input--inner-icon-left': innerIconLeft,
        }"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />

      <textarea
        v-else
        v-bind="$attrs"
        class="input input--textarea"
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
  modelValue: string | number;
  invalid?: boolean;
  isTextarea?: boolean;
  innerIconLeft?: boolean;
}

interface IEmits {
  (e: 'update:modelValue', newValue: string): void;
}

defineProps<IProps>();
defineEmits<IEmits>();
</script>
