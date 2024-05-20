<template>
  <section class="subscriptions">
    <div class="subscriptions__content">
      <div>
        <div class="table-grid items-center border border-solid border-gray-300 bg-gray-100 px-4 py-3">
          <span class="text-xs font-medium text-blue-gray-500">Автор</span>
          <span class="text-xs font-medium text-blue-gray-500">Статус</span>
          <span class="text-xs font-medium text-blue-gray-500">Следующее списание</span>
          <span class="text-xs font-medium text-blue-gray-500">Сумма, тг.</span>
        </div>

        <div class="flex flex-col">
          <SubscribeRow
            avatar="https://avatars.githubusercontent.com/u/76869388?v=4"
            user-name="Досмурат"
            :status="1"
            date="2024-05-19T11:50:22.111Z"
            sum="2500"
            class="table-grid"
            @open-settings="visibleCancelSubs = true"
          />

          <SubscribeRow
            avatar="https://avatars.githubusercontent.com/u/76869388?v=4"
            user-name="Досмурат"
            :status="2"
            date="2024-05-19T11:50:22.111Z"
            sum="2500"
            class="table-grid"
            @open-settings="visibleCancelSubs = true"
          />
        </div>
      </div>
    </div>

    <CancelSubscribe
      :visible-cancel-subs="visibleCancelSubs"
      @cancel-subscribe="cancelSubscribe"
      @close="visibleCancelSubs = false"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import SubscribeRow from './components/SubscribeRow.vue';
import CancelSubscribe from './components/CancelSubscribe.vue';

const visibleCancelSubs = ref<boolean>(false);

function cancelSubscribe() {
  visibleCancelSubs.value = false;
}
</script>

<style scoped>
.table-grid {
  @apply grid;

  grid-template-columns: 2fr 1fr 1fr 1fr 30px;
}

.subscriptions__content {
  @apply w-[916px] rounded-lg bg-white px-6 py-3 shadow-standard;
}
</style>
