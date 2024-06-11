<template>
  <div>
    <UIInput
      v-model="sum"
      label="Введите сумму, тг."
      placeholder="Сумма"
      required
      autocomplete="off"
    />

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
const balance = ref<number>(0);

const validData = computed(() => {
  return Number(sum.value) <= balance.value && Number(sum.value) > 0;
});

function createPayment() {
  api.payments
    .makePayout({
      amount: sum.value,
    })
    .then(data => {
      window.open(data.checkout_url, '_blank');
    });
}

onMounted(() => {
  api.profile.getBalance().then(data => {
    balance.value = data.balance;
    sum.value = 0;
  });
});
</script>
