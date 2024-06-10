<template>
  <div>
    <div class="table-grid items-center border border-solid border-gray-300 bg-gray-100 px-4 py-3">
      <span class="text-xs font-medium text-blue-gray-500">№ заявки</span>
      <span class="text-xs font-medium text-blue-gray-500">Сумма, тг</span>
      <span class="text-xs font-medium text-blue-gray-500">Дата транзакции</span>
      <span class="text-xs font-medium text-blue-gray-500">Статус</span>
    </div>

    <div class="flex flex-col">
      <HistoryPaymentRow
        v-for="(hist, index) in historyStat"
        :key="hist.payment_uuid"
        class="table-grid"
        :id="index + 1 + (currentPage > 1 ? currentPage * 10 : 0)"
        :sum="getFormatSum(hist.amount_with_commission)"
        :date="dayjs(hist.created).format('DD.MM.YYYY, HH:MM')"
        :status="hist.payment_status"
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
import HistoryPaymentRow from './HistoryPaymentRow.vue';

import { getFormatSum } from '@/helpers/getFormatSum';

const historyStat = ref<any[]>([]);

const currentPage = ref<number>(1);
const countPages = ref<number>(1);

function fetchHistoryPayments() {
  api.payments.getStatistics('OUT', currentPage.value)
    .then(data => {
      countPages.value = Math.ceil(data.count / 10);
      historyStat.value = [...data.results];
    });
}

function loadNewPage(type: 'prev' | 'next') {
  if (type === 'next') {
    currentPage.value += 1;
  } else {
    currentPage.value -= 1;
  }

  fetchHistoryPayments();
}

onMounted(() => {
  fetchHistoryPayments();
});
</script>

<style scoped>
.table-grid {
  @apply grid;
  grid-template-columns: 1fr 1fr 2fr 1fr;
}
</style>
