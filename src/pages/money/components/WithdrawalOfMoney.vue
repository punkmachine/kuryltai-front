<template>
  <div>
    <UIInput
      v-model="sum"
      label="Введите сумму, тг."
      placeholder="Сумма"
      required
      autocomplete="off"
    />

    <div class="mt-7">
      <h2 class="text-gray-900 text-center text-xl font-bold">Способ оплаты</h2>

      <div class="flex flex-col gap-3.5">
        <UIInput
          v-model="pan"
          v-mask="'#### #### #### ####'"
          label="Номер карты"
          placeholder="Номер карты"
          required
          autocomplete="off"
          inner-icon-left
        >
          <template #inner-icon-left>
            <svg class="w-4 h-4">
              <use xlink:href="@/assets/icons/sprites/inputs.svg#card"></use>
            </svg>
          </template>
        </UIInput>

        <UIInput
          v-model="holder"
          label="Имя на карте"
          placeholder="Имя на карте"
          required
          autocomplete="off"
        />
      </div>
    </div>

    <button
      @click="createPayment"
      class="btn mt-4 w-full uppercase"
      :disabled="!validData"
      :class="{
        'btn--secondary': !validData,
        'btn--primary': validData,
      }"
    >
      Оплатить
    </button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, onMounted } from 'vue';

import { api } from '@/api';

import UIInput from '@/components/ui/UIInput.vue';

const sum = ref<number>(0);
const holder = ref<string>('');
const pan = ref<string>('');
const balance = ref<number>(0);

const validData = computed(() => {
  return Number(sum.value) <= balance.value && Number(sum.value) > 0 && pan.value.length === 19 && holder.value.length > 2;
});

function createPayment() {
  api.payments
    .makePayout({
      amount: sum.value,
      // @ts-ignore
      pan: pan.value.replaceAll(' ', ''),
      holder: holder.value,
    });
}

onMounted(() => {
  api.profile.getBalance().then(data => {
    balance.value = data.balance;
    sum.value = 0;
    pan.value = '';
    holder.value = '';
  });
});
</script>
