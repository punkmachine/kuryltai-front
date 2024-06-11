<template>
  <div>
    <div class="table-grid items-center border border-solid border-gray-300 bg-gray-100 px-4 py-3">
      <span class="text-xs font-medium text-blue-gray-500">№ заявки</span>
      <span class="text-xs font-medium text-blue-gray-500">Сумма, тг</span>
      <span class="text-xs font-medium text-blue-gray-500">Дата транзакции</span>
      <span class="text-xs font-medium text-blue-gray-500">Статус</span>
    </div>

    <div class="flex flex-col">
      <IncomeMoneyRow
        v-for="item in incomeStat"
        :key="item.payment_uuid"
        :date="dayjs(item.created).format('DD.MM.YYYY, HH:MM')"
        :sum="getFormatSum(item.amount_with_commission)"
        :payment-type="item.payment_type"
        :login="item.username"
        class="table-grid"
      />
    </div>

    <div class="mt-6 flex justify-end">
      <UIPagination
        :current-page="currentPage"
        :count-pages="countPages"
        @prev-page="loadNewPage('prev')"
        @next-page="loadNewPage('next')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs';

import { api } from '@/api';

import UIPagination from '@/components/ui/UIPagination.vue';
import IncomeMoneyRow from './IncomeMoneyRow.vue';

import { getFormatSum } from '@/helpers/getFormatSum';

const incomeStat = ref<any[]>([]);

const currentPage = ref<number>(1);
const countPages = ref<number>(1);

function fetchIncomeMoney() {
  api.payments.getStatistics('IN', currentPage.value).then(data => {
    countPages.value = Math.ceil(data.count / 10);
    incomeStat.value = [...data.results];
  });
}

function loadNewPage(type: 'prev' | 'next') {
  if (type === 'next') {
    currentPage.value += 1;
  } else {
    currentPage.value -= 1;
  }

  fetchIncomeMoney();
}

onMounted(() => {
  fetchIncomeMoney();
});
</script>

<style scoped>
.table-grid {
  @apply grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
}
</style>
