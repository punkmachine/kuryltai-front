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
        :date="dayjs().format('DD.MM.YYYY, HH:MM')"
        :sum="getFormatSum('999999')"
        payment-type="Подписка"
        login="Логинчик"
        class="table-grid"
      />

      <IncomeMoneyRow
        :date="dayjs().format('DD.MM.YYYY, HH:MM')"
        :sum="getFormatSum('999999')"
        payment-type="Подписка"
        login="Логинчик"
        class="table-grid"
      />

      <IncomeMoneyRow
        :date="dayjs().format('DD.MM.YYYY, HH:MM')"
        :sum="getFormatSum('999999')"
        payment-type="Подписка"
        login="Логинчик"
        class="table-grid"
      />
    </div>

    <div class="mt-6 flex justify-end">
      <UIPagination
        :current-page="1"
        :count-pages="10"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs';
import UIPagination from '@/components/ui/UIPagination.vue';
import IncomeMoneyRow from './IncomeMoneyRow.vue';
import { getFormatSum } from '@/helpers/getFormatSum';
</script>

<style scoped>
.table-grid {
  @apply grid;
  grid-template-columns: 2fr 1fr 2fr 1fr;
}
</style>
