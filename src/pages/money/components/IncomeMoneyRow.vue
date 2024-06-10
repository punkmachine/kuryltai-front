<template>
  <div class="border-b border-solid border-gray-300 py-3">
    <div class="text-sm text-gray-900">{{ login }}</div>
    <div class="text-sm text-blue-gray-500">{{ getReadablePaymentType(paymentType) }}</div>
    <div class="text-sm text-blue-gray-500">{{ date }}</div>
    <div class="text-sm text-blue-gray-500">{{ sum }}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

interface IProps {
  login: string;
  paymentType: string; // @todo: enum
  date: string;
  sum: string;
}

defineProps<IProps>();

function getReadablePaymentType(paymentType: string) {
  const dict = {
    membership: 'Подписка',
    donation: 'Донат'
  };

  // @ts-ignore
  return dict[paymentType] ? dict[paymentType] : 'none type';
}
</script>
