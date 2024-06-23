<template>
  <section class="profile">
    <ProfileHead
      my-profile
      @add-subscription="visibleAddSubscription = true"
    />

    <section class="profile__content">
      <div class="profile__posts infinite-list">
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
          :likes="post.likes_count"
          @delete-post="deletePostClick(post.id)"
          @edit-post="router.push(`/add-post?edited=${[post.id]}`)"
          @like="likePost(post.id)"
        />

        <infinite-loading @infinite="fetchNextPage" />
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
import { useRouter } from 'vue-router';

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

const router = useRouter();

const myProfileStore = useMyProfileStore();

const { posts } = storeToRefs(myProfileStore);

const visibleAddSubscription = ref(false);
const visibleEditSubscription = ref(false);
const visibleDelSubscription = ref(false);
const visibleDeletePost = ref(false);

const deletedMembership = ref<any>(null);
const editedMembership = ref<any>(null);
const deletedPost = ref<number>(0);

const membershipsList = ref<any[]>([]);

const page = ref<number>(1);

function deleteSubscriptionsClick(membership: any) {
  deletedMembership.value = membership;
  visibleDelSubscription.value = true;
}

function editSubscriptionClick(membership: any) {
  editedMembership.value = membership;
  visibleEditSubscription.value = true;
}

function deletePostClick(id: number) {
  visibleDeletePost.value = true;
  deletedPost.value = id;
}

// eslint-disable-next-line
async function fetchNextPage($state: any) {
  try {
    page.value = page.value + 1;

    myProfileStore.fetchMyPosts(page.value, (data: any) => {
      if (data.next) {
        $state.loaded();
      } else {
        $state.complete();
      }
    });
  } catch (error) {
    $state.error();
  }
}

// eslint-disable-next-line
function likePost(id: number) {
  api.posts.likePost({ post_id: id }).then(() => {
    posts.value = posts.value.map(post => {
      if (post.id !== id) {
        return post;
      } else {
        return {
          ...post,
          likes_count: post.likes_count + 1,
        };
      }
    });
  });
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
  api.posts.deletePostById(deletedPost.value).then(() => {
    myProfileStore.deletePostInStore(deletedPost.value);
    visibleDeletePost.value = false;
    deletedPost.value = 0;
  });
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
