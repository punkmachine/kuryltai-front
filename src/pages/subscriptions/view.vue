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
            v-for="subscribe in subscriptions"
            :key="subscribe.profile_uuid"
            :avatar="subscribe.avatar_image"
            :user-name="subscribe.username"
            :status="subscribe.membership_subscription.state === 'Active' ? 1 : 2"
            :date="subscribe.membership_subscription.end_date"
            :sum="subscribe.membership_info.monthly_price"
            class="table-grid"
            @open-settings="cancelSubscribeClick(subscribe.membership_subscription.id)"
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
import { ref, onMounted } from 'vue';
import { api } from '@/api';
import SubscribeRow from './components/SubscribeRow.vue';
import CancelSubscribe from './components/CancelSubscribe.vue';

const visibleCancelSubs = ref<boolean>(false);
const currentSubscriptionId = ref<any>(null);
const subscriptions = ref<any[]>([]);

function fetchSubscribed() {
  api.profile.getMySubscribed().then(data => {
    subscriptions.value = [...data.author_subscribers];
  });
}

function cancelSubscribe() {
  api.memberships
    .deactivateMembership({
      membership_subscription_id: currentSubscriptionId.value,
    })
    .then(fetchSubscribed)
    .finally(() => {
      visibleCancelSubs.value = false;
    });
}

function cancelSubscribeClick(id: string) {
  visibleCancelSubs.value = true;
  currentSubscriptionId.value = id;
}

onMounted(() => {
  fetchSubscribed();
});
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
