<template>
  <section class="profile">
    <ProfileHead @show-donate="visibleDonateModal = true" />

    <section class="profile__content">
      <div class="profile__posts">
        <FullPost
          name="Алекс"
          date="2024-05-09T07:40:00.000Z"
          avatar="https://avatars.githubusercontent.com/u/76869388?v=4"
          heading="Здесь заголовок будет"
          text="text text text text text text text text text text text text text"
          has-access
          :images="['/demo/demo1.png', '/demo/demo2.png']"
        />

        <FullPost
          name="Алекс"
          date="2024-05-09T07:40:00.000Z"
          avatar="https://avatars.githubusercontent.com/u/76869388?v=4"
          heading="Здесь заголовок будет"
          text="text text text text text text text text text text text text text"
          has-access
          :audios="['/demo/demo1.mp3', '/demo/demo1.mp3']"
          :tags="['tag1', 'tag2', 'tag3']"
        />

        <FullPost
          name="Алекс"
          date="2024-05-09T07:40:00.000Z"
          avatar="https://avatars.githubusercontent.com/u/76869388?v=4"
          heading="Здесь заголовок будет"
          text="text text text text text text text text text text text text text"
          :images="['/demo/demo1.png', '/demo/demo2.png']"
          :videos="['/demo/demo.mp4']"
          :audios="['/demo/demo1.mp3', '/demo/demo1.mp3']"
        />
      </div>

      <div class="subscriptions">
        <SubscriptionsCard
          title="1200 ₸"
          subtitle="Стандартная"
          active
          is-full
          valid-until="2024-05-15T07:40:00.000Z"
          description="Подписка дает право на чтение всех материалов в блоге"
        />

        <SubscriptionsCard
          title="2 400 ₸"
          subtitle="Меценат"
          is-full
          description="Стоимость подписки 2 400 тенге в месяц. Автор хочет писать тексты тут, не отвлекаясь на сторонние заработки. Вы можете ему в этом помочь."
          @subscribe="visibleSubscribeModal = true"
        />
      </div>
    </section>

    <DonateModal
      :visible-donate-modal="visibleDonateModal"
      @close="visibleDonateModal = false"
    />

    <SubscribeModal
      :visible-subscribe-modal="visibleSubscribeModal"
      @close="visibleSubscribeModal = false"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import FullPost from '@/components/post/FullPost.vue';
import ProfileHead from '@/components/ProfileHead.vue';
import SubscriptionsCard from '@/components/subscriptions/SubscriptionsCard.vue';
import SubscribeModal from './components/SubscribeModal.vue';
import DonateModal from './components/DonateModal.vue';

const visibleDonateModal = ref(false);
const visibleSubscribeModal = ref(false);
</script>

<style scoped>
.profile__content {
  @apply mt-5 grid gap-x-5;

  grid-template-columns: 2fr 1fr;
}

.profile__posts {
  @apply flex w-full flex-col gap-5 pb-5;
}

.subscriptions {
  @apply flex flex-col gap-5;
}
</style>
