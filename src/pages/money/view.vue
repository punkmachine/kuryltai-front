<template>
  <section class="money">
    <div class="money__content">
      <keep-alive>
        <component :is="component" />
      </keep-alive>
    </div>

    <div class="money__aside">
      <div
        v-for="item in asideItems"
        :key="item.key"
        class="flex cursor-pointer items-center gap-1 rounded-lg px-3 py-2"
        :class="{
          'bg-blue-gray-50': moneyState === item.key,
        }"
        @click="moneyState = item.key"
      >
        <svg class="h-4 w-4">
          <use :xlink:href="`${icons}#${item.key}`"></use>
        </svg>
        <span class="text-sm font-medium text-blue-gray-500">{{ item.label }}</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import WithdrawalOfMoney from './components/WithdrawalOfMoney.vue';
import IncomeMoney from './components/IncomeMoney.vue';
import HistoryPayments from './components/HistoryPayments.vue';
import { asideItems } from './constants';
//@ts-ignore
import icons from '@/assets/icons/sprites/menu.svg';
import { moneyStateKey } from '@/entities/constants/localStorageKeys';
import type { TMoneyState } from './types';

const moneyState = ref<TMoneyState>('withdrawal');

const component = computed(() => {
  if (moneyState.value === 'history') {
    return HistoryPayments;
  } else if (moneyState.value === 'income') {
    return IncomeMoney;
  } else {
    return WithdrawalOfMoney;
  }
});

watch(
  () => moneyState.value,
  () => {
    localStorage.setItem(moneyStateKey, moneyState.value);
  },
);

onMounted(() => {
  if (localStorage.getItem(moneyStateKey)) {
    moneyState.value = localStorage.getItem(moneyStateKey) as TMoneyState;
  }
});

onBeforeUnmount(() => {
  localStorage.removeItem(moneyStateKey);
});
</script>

<style scoped>
.money {
  @apply grid gap-x-5;

  grid-template-columns: 2fr 1fr;
}

.money__content {
  @apply w-[604px] rounded-lg bg-white px-6 py-3 shadow-standard;
}

.money__aside {
  @apply flex h-max w-[292px] flex-col rounded-lg bg-white px-3 py-6 shadow-standard;
}
</style>
