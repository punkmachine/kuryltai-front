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

      <div
        v-if="!isTextarea && constantValue"
        ref="constInput"
        class="relative"
      >
        <span
          v-if="constantValue"
          class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-gray-400"
        >
          {{ constantValue }}
        </span>

        <input
          type="text"
          v-bind="$attrs"
          class="input"
          :class="{
            'input--invalid': invalid,
            'input--inner-icon-left': innerIconLeft,
            'h-12': Boolean($slots['after-inner']),
            'input--const': Boolean(constantValue),
          }"
          :value="modelValue"
          @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        />
      </div>

      <input
        v-else-if="!isTextarea && !constantValue"
        type="text"
        v-bind="$attrs"
        class="input"
        :class="{
          'input--invalid': invalid,
          'input--inner-icon-left': innerIconLeft,
          'h-12': Boolean($slots['after-inner']),
          'input--const': Boolean(constantValue),
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

      <div v-if="$slots['after-inner']" data-slot="after-inner" class="absolute right-2 top-1/2 -translate-y-1/2">
        <slot name="after-inner"></slot>
      </div>
      <slot name="inner-icon-right"></slot>
    </div>
  </label>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onMounted, ref, useSlots } from 'vue';

interface IProps {
  label?: string;
  modelValue: string | number;
  invalid?: boolean;
  isTextarea?: boolean;
  innerIconLeft?: boolean;
  constantValue?: string;
}

interface IEmits {
  (e: 'update:modelValue', newValue: string): void;
}

const slots = useSlots();
defineProps<IProps>();
defineEmits<IEmits>();

const constInput = ref<HTMLInputElement | null>(null);

function setPaddingForConstInput() {
  if (constInput.value) {
    const span = constInput.value.querySelector('span');
    const input = constInput.value.querySelector('input');

    if (span && input) {
      input.style.paddingLeft = `${span.clientWidth + 16}px`;
    }
  }
}

// eslint-disable-next-line id-length
function setPaddingForAfterContent() {
  if (slots['after-inner']) {
    const slotContainer = document.querySelector(`[data-slot="after-inner"]`);
    const input = constInput.value?.querySelector('input');

    if (slotContainer && input) {
      input.style.paddingRight = `${slotContainer.clientWidth + 16}px`;
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    setPaddingForConstInput();
    setPaddingForAfterContent();
  }, 258);
});
</script>
