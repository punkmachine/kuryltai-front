<template>
  <div>
    <div class="grid grid-cols-2 items-center border border-solid border-gray-300 bg-gray-100 px-4 py-3">
      <span class="text-xs font-medium text-blue-gray-500">Карта</span>
      <span class="text-xs font-medium text-blue-gray-500">Дата добавления</span>
    </div>

    <div class="flex flex-col">
      <div
        v-for="card in cards"
        :key="card.card_uuid"
        class="grid grid-cols-2 border-b border-solid border-gray-300 py-3"
      >
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center rounded-md border border-solid border-gray-300 px-2">
            <svg class="h-8 w-8">
              <use xlink:href="@/assets/icons/sprites/cards.svg#visa"></use>
            </svg>
          </div>

          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-900">
              {{ card.card_type }} {{ card.card_number.slice(-4) }}
            </span>
            <span class="text-sm text-blue-gray-500"
              >До {{ card.expiration_month.toString().padStart(2, '0') }}/20{{ card.expiration_year }}</span
            >
          </div>
        </div>

        <div class="relative flex items-center justify-between">
          <span class="text-sm text-blue-gray-500"> {{ dayjs(card.created).format('DD.MM.YYYY HH:mm') }} </span>

          <button @click="currentCard = card.card_uuid">
            <svg class="h-5 w-5">
              <use xlink:href="@/assets/icons/sprites/btns.svg#settings"></use>
            </svg>
          </button>

          <div
            class="absolute -bottom-full right-0 hidden flex-col rounded-lg bg-white shadow-lg"
            :class="{
              '!flex': currentCard === card.card_uuid,
            }"
          >
            <!-- <span
              class="cursor-pointer rounded-t-lg px-4 py-2 pt-3 hover:bg-slate-100"
              @click="editCardClick(card.card_uuid)"
            >
              Редактировать
            </span> -->
            <span
              class="cursor-pointer rounded-b-lg px-4 py-2 pb-3 hover:bg-slate-100"
              @click="deleteCardClick(card.card_uuid)"
            >
              Удалить
            </span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="mt-7"
      @click="addCardClick"
    >
      <button class="btn btn--primary w-max px-8 uppercase">Добавить карту</button>
    </div>

    <UIModal
      :visible="addCardModalVisible"
      class="w-108"
      @close="addCardModalVisible = false"
    >
      <template #header>
        <h3 class="text-center text-xl font-bold text-gray-900">Добавить карту</h3>
      </template>

      <template #body>
        <AddFormCard
          :initial-card-data="newCard"
          @update-card-data="cardData => (newCard = cardData)"
          class="flex flex-col gap-3.5"
        />
      </template>

      <template #footer>
        <button
          @click="createCard"
          class="btn w-full uppercase"
          :disabled="!validData"
          :class="{
            'btn--secondary': !validData,
            'btn--primary': validData,
          }"
        >
          Добавить
        </button>
      </template>
    </UIModal>

    <UIModal
      :visible="deleteCardModalVisible"
      class="w-108"
      @close="deleteCardModalClose"
    >
      <template #header>
        <h3 class="text-xl font-bold text-gray-900">Удалить карту?</h3>
      </template>

      <template #body>
        <div class="flex flex-col gap-3.5 text-base text-blue-gray-500">
          <p>Текст по удалению карты</p>
        </div>
      </template>

      <template #footer>
        <div class="flex items-center gap-3">
          <button
            class="btn shadow-none"
            @click="deleteCard"
          >
            Подтвердить
          </button>

          <button
            class="btn btn--primary"
            @click="deleteCardModalClose"
          >
            Оставить карту
          </button>
        </div>
      </template>
    </UIModal>

    <SecureForm
      v-if="secureData"
      :secure-data="secureData"
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import dayjs from 'dayjs';
import { toast } from 'vue3-toastify';
import { api } from '@/api';
import { useMyProfileStore } from '@/store';
import { useLoadScript } from '@/composables/useLoadScript';
import UIModal from '@/components/ui/UIModal.vue';
import AddFormCard from '@/components/AddFormCard.vue';
import SecureForm from '@/components/SecureForm';

const { loadScript } = useLoadScript();

const myProfileStore = useMyProfileStore();

const addCardModalVisible = ref<boolean>(false);
const deleteCardModalVisible = ref<boolean>(false);
const secureData = ref<any>({});

const currentCard = ref<string>('');
const cards = ref<any[]>([]);

const newCard = ref({
  name: '',
  number: '',
  cvc: '',
  date: '',
});

let checkout: any = null;

const validData = computed(
  () =>
    newCard.value.name.length > 3 &&
    newCard.value.cvc.length === 3 &&
    newCard.value.number.length === 19 &&
    newCard.value.date.length === 5,
);

function deleteCardModalClose() {
  deleteCardModalVisible.value = false;
  currentCard.value = '';
}

function addCardClick() {
  addCardModalVisible.value = true;
}

function deleteCardClick(uuid: string) {
  deleteCardModalVisible.value = true;
  currentCard.value = uuid;
}

// eslint-disable-next-line max-lines-per-function
function initPayment() {
  // @ts-ignore
  if (window.cp) {
    // @ts-ignore
    checkout = new cp.Checkout({
      publicId: import.meta.env.VITE_APP_CRYPTO_KEY,
    });
  } else {
    setTimeout(() => {
      // @ts-ignore
      checkout = new cp.Checkout({
        publicId: import.meta.env.VITE_APP_CRYPTO_KEY,
      });
    }, 1000);
  }
}

async function createCryptogram(cardData: any) {
  const fieldValues = {
    cvv: cardData.cvc,
    cardNumber: cardData.number,
    expDateMonth: cardData.date.slice(0, 2),
    expDateYear: cardData.date.slice(3),
  };

  return checkout.createPaymentCryptogram(fieldValues);
}

// eslint-disable-next-line max-lines-per-function
async function adapterCreatePaymentCard(newCard: any) {
  const cryptogram = await createCryptogram(newCard.value);

  if (!cryptogram) throw 'Error Payment';

  return {
    name: newCard.value.name,
    profile_uuid: myProfileStore.profile.profile_uuid,
    is_save_card: true,
    amount: 0,
    currency: 'KZT',
    cryptogram: cryptogram,
  };
}

function getPayments() {
  api.payments.getPaymentsCards().then(data => {
    cards.value = [...data.results];
  });
}

// eslint-disable-next-line max-lines-per-function
async function createCard() {
  const payload = await adapterCreatePaymentCard(newCard);

  // eslint-disable-next-line max-lines-per-function
  api.payments.makeMembership(payload).then(data => {
    if (data.success) {
      getPayments();
      addCardModalVisible.value = false;
      toast.success('Успешно!');
      myProfileStore.fetchMyCards();
    } else if (data.is_3d_secure) {
      secureData.value = {
        MD: data.MD,
        PaReq: data.PaReq,
        AcsUrl: `${data.AcsUrl}-get`,
      };

      localStorage.setItem('secureData', JSON.stringify(secureData.value));
      window.open(
        `${data.AcsUrl}-get?MD=${data.MD}&PaReq=${data.PaReq}&TermUrl=https://api-kuryltai.kz/api/v0/payments/complete-3d-secure/`,
        '_self',
      );
    } else if (data.error) {
      toast.error(data.error);
    } else {
      toast.error('Произошла ошибка при донате');
    }
  });
}

function deleteCard() {
  api.payments.deletePaymentsCard(currentCard.value).then(() => {
    getPayments();
    deleteCardModalClose();
  });
}

onMounted(() => {
  loadScript('https://checkout.cloudpayments.ru/checkout.js');

  setTimeout(() => {
    initPayment();
  }, 2000);

  getPayments();
});
</script>
