<template>
  <section class="profile">
    <ProfileHead
      my-profile
      @add-subscription="visibleAddSubscription = true"
    />

    <section class="profile__content">
      <div class="profile__posts">
        <FullPost
          v-for="post in posts"
          :key="post.id"
          :name="post.profile.username"
          :date="post.created"
          :avatar="post.profile.avatar_image"
          :heading="post.title"
          :text="post.description"
          :has-access="post.have_access"
          is-my-post
          :images="post.contents.image?.map((item: any) => item.value)"
          :videos="post.contents.video?.files?.map((item: any) => item.value)"
          :audios="post.contents.audio?.map((item: any) => item.value)"
          :files="post.contents.document?.map((item: any) => item.value)"
          :you-tubes="post.contents.video?.urls.map((item: any) => item.value)"
          :tags="post.tags"
          @delete-post="visibleDeletePost = true"
        />

        <!-- <FullPost
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
        /> -->
      </div>

      <div class="subscriptions">
        <SubscriptionsCard
          v-for="membership in membershipsList"
          :key="membership.id"
          :title="`${membership.monthly_price.slice(0, -3)} ₸`"
          :subtitle="membership.name"
          active
          is-full
          is-my
          :description="membership.membership_description"
          @edit-subscription="editSubscriptionClick(membership)"
          @delete-subscriptions="deleteSubscriptionsClick(membership)"
        />
      </div>
    </section>

    <AddSubscription
      :visible-add-subscription="visibleAddSubscription"
      @close="visibleAddSubscription = false"
      @add-subscription="addSubscription"
    />

    <EditSubscription
      v-if="editedMembership"
      :visible-edit-subscription="visibleEditSubscription"
      :membership="editedMembership"
      @close="visibleEditSubscription = false"
      @update-subscription="updateSubscription"
    />

    <DeleteSubscription
      :id="deletedMembership?.id"
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
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import { api } from '@/api';

import { useMyProfileStore } from '@/store';

import FullPost from '@/components/post/FullPost.vue';
import ProfileHead from '@/components/ProfileHead.vue';
import SubscriptionsCard from '@/components/subscriptions/SubscriptionsCard.vue';
import AddSubscription from './components/AddSubscription.vue';
import EditSubscription from './components/EditSubscription.vue';
import DeleteSubscription from './components/DeleteSubscription.vue';
import DeletePost from './components/DeletePost.vue';
import type { IAddSubscriptionData, IEditSubscriptionData } from './types';

const myProfileStore = useMyProfileStore();

const { posts } = storeToRefs(myProfileStore);

const visibleAddSubscription = ref(false);
const visibleEditSubscription = ref(false);
const visibleDelSubscription = ref(false);
const visibleDeletePost = ref(false);

const deletedMembership = ref<any>(null);
const editedMembership = ref<any>(null);

const membershipsList = ref<any[]>([]);

function deleteSubscriptionsClick(membership: any) {
  deletedMembership.value = membership;
  visibleDelSubscription.value = true;
}

function editSubscriptionClick(membership: any) {
  editedMembership.value = membership;
  visibleEditSubscription.value = true;
}

function addSubscription(data: IAddSubscriptionData) {
  const payload = {
    name: data.name,
    monthly_price: data.sum,
    membership_description: data.description,
  };

  api.memberships.createMembership(payload).then(() => {
    visibleAddSubscription.value = false;
    getMyMemberships();
  });
}

function updateSubscription(data: IEditSubscriptionData) {
  const payload = {
    name: data.name,
    monthly_price: data.sum,
    membership_description: data.description,
  };

  api.memberships.editMembership(payload, editedMembership.value.id).then(() => {
    getMyMemberships();
    visibleEditSubscription.value = false;
    editedMembership.value = null;
  });
}

function deleteSubscription(id: number) {
  api.memberships.deleteMembership({}, id).then(() => {
    getMyMemberships();
    visibleDelSubscription.value = false;
    deletedMembership.value = null;
  });
}

function deletePost() {
  visibleDeletePost.value = false;
}

function getMyMemberships() {
  api.memberships.getUserMemberships().then(data => {
    membershipsList.value = [...data];
  });
}

onMounted(() => {
  getMyMemberships();
  myProfileStore.fetchMyProfile();
  myProfileStore.fetchMyPosts(1);
});
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
