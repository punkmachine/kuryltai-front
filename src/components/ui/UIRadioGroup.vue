<template>
  <article class="radio-group">
    <label
      v-for="option in options"
      :key="option.value"
      class="radio-group__label"
    >
      <input
        :name="id"
        :id="option.value"
        :checked="option.value === value"
        type="radio"
        class="radio-group__input"
        @change="value = option.value"
      />
      <span class="radio-group__text">{{ option.label }}</span>
    </label>
  </article>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, onMounted } from 'vue';

interface IRadioOptions {
  label: string;
  value: string;
}

interface IProps {
  id: string;
  options: IRadioOptions[];
  defaultValue: string;
}

interface IEmits {
  (e: 'update:modelValue', newValue: string): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const value = ref<string>('');

watch(
  () => value.value,
  () => {
    emit('update:modelValue', value.value);
  },
);

onMounted(() => {
  value.value = props.defaultValue;
});
</script>
