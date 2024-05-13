<template>
  <section class="profile">
    <ProfileHead
      my-profile
      @add-subscription="visibleAddSubscription = true"
    />

    <section class="profile__content">
      <div class="profile__posts">
        <FullPost
          name="Алекс"
          date="2024-05-09T07:40:00.000Z"
          avatar="https://avatars.githubusercontent.com/u/76869388?v=4"
          heading="Здесь заголовок будет"
          text="text text text text text text text text text text text text text"
          has-access
          is-my-post
          :images="['/demo/demo1.png', '/demo/demo2.png']"
          :tags="['tag1', 'tag2', 'tag3']"
          @delete-post="visibleDeletePost = true"
        />

        <FullPost
          name="Алекс"
          date="2024-05-09T07:40:00.000Z"
          avatar="https://avatars.githubusercontent.com/u/76869388?v=4"
          heading="Здесь заголовок будет"
          text="text text text text text text text text text text text text text"
          has-access
          is-my-post
          :audios="['/demo/demo1.mp3', '/demo/demo1.mp3']"
          :tags="['tag1', 'tag2', 'tag3']"
          @delete-post="visibleDeletePost = true"
        />

        <FullPost
          name="Алекс"
          date="2024-05-09T07:40:00.000Z"
          avatar="https://avatars.githubusercontent.com/u/76869388?v=4"
          heading="Здесь заголовок будет"
          text="text text text text text text text text text text text text text"
          has-access
          is-my-post
          :images="['/demo/demo1.png', '/demo/demo2.png']"
          :videos="['/demo/demo.mp4']"
          :audios="['/demo/demo1.mp3', '/demo/demo1.mp3']"
          @delete-post="visibleDeletePost = true"
        />
      </div>

      <div class="subscriptions">
        <SubscriptionsCard
          title="1200 ₸"
          subtitle="Стандартная"
          active
          is-full
          is-my
          valid-until="2024-05-15T07:40:00.000Z"
          description="Подписка дает право на чтение всех материалов в блоге"
          @edit-subscription="visibleEditSubscription = true"
          @delete-subscriptions="visibleDelSubscription = true"
        />

        <SubscriptionsCard
          title="2 400 ₸"
          subtitle="Меценат"
          is-full
          is-my
          description="Стоимость подписки 2 400 тенге в месяц. Автор хочет писать тексты тут, не отвлекаясь на сторонние заработки. Вы можете ему в этом помочь."
        />
      </div>
    </section>

    <AddSubscription
      :visible-add-subscription="visibleAddSubscription"
      @close="visibleAddSubscription = false"
      @add-subscription="addSubscription"
    />

    <EditSubscription
      :visible-edit-subscription="visibleEditSubscription"
      @close="visibleEditSubscription = false"
      @update-subscription="updateSubscription"
    />

    <DeleteSubscription
      :visible-delete-subscription="visibleDelSubscription"
      @close="visibleDelSubscription = false"
      @delete-subscription="deleteSubscription"
    />

    <DeletePost
      :visible-delete-post="visibleDeletePost"
      @close="visibleDeletePost = false"
      @delete-post="deletePost"
    />
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import FullPost from '@/components/post/FullPost.vue';
import ProfileHead from '@/components/ProfileHead.vue';
import SubscriptionsCard from '@/components/subscriptions/SubscriptionsCard.vue';
import AddSubscription from './components/AddSubscription.vue';
import EditSubscription from './components/EditSubscription.vue';
import DeleteSubscription from './components/DeleteSubscription.vue';
import DeletePost from './components/DeletePost.vue';
import type { IAddSubscriptionData, IEditSubscriptionData } from './types';

const visibleAddSubscription = ref(false);
const visibleEditSubscription = ref(false);
const visibleDelSubscription = ref(false);
const visibleDeletePost = ref(false);

function addSubscription(data: IAddSubscriptionData) {
  console.log(data);
  // @todo: апишка создания подписки
  visibleAddSubscription.value = false;
}

function updateSubscription(data: IEditSubscriptionData) {
  console.log(data);
  // @todo: апишка обновления подписки
  visibleEditSubscription.value = false;
}

function deleteSubscription() {
  visibleDelSubscription.value = false;
}

function deletePost() {
  // @todo: апишка удаления поста
  visibleDeletePost.value = false;
}
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
