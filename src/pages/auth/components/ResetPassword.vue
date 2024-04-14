<template>
  <div>
    <h1 class="mb-3">Восстановление пароля</h1>
    <p class="mb-6 max-w-96 text-center text-sm text-gray-900">
      {{ descriptionText }}
    </p>

    <div
      v-if="currentStep === AuthStepEnum.resetPasswordAfterSendEmail"
      class="mb-14 mt-9 flex items-center justify-center"
    >
      <img
        src="@/assets/images/reset-password.png"
        alt=""
      />
    </div>

    <form
      v-if="currentStep === AuthStepEnum.resetPassword"
      class="flex w-96 flex-col gap-3.5"
      @submit.prevent="submitForm"
    >
      <UIInput
        v-model="email"
        label="Эл. почта"
        placeholder="example@mail.com"
        autocomplete="email"
        :invalid="invalidEmail"
      />

      <button
        type="submit"
        class="btn btn--primary"
      >
        Отправить
      </button>
    </form>

    <button
      v-if="currentStep === AuthStepEnum.resetPasswordAfterSendEmail"
      class="btn btn--primary"
      @click="goInitialSingIn"
    >
      Вернуться
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps, onMounted, computed } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';
import { AuthStepEnum } from '../types';

interface IEmits {
  (e: 'sendEmailResetPass', email: string): void;
  (e: 'goSignIn'): void;
}

interface IProps {
  initialEmail: string;
  currentStep: AuthStepEnum;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const email = ref<string>('');
const invalidEmail = ref<boolean>(false);

const descriptionText = computed(() => {
  const dict = {
    [AuthStepEnum.resetPassword]:
      'Введите адрес эл. почты, который вы указали при регистрации. Мы отправим письмо со ссылкой для входа в аккаунт.',
    [AuthStepEnum.resetPasswordAfterSendEmail]: 'Мы отправили Вам письмо на почту, чтобы Вы могли сбросить пароль',
  };

  // @ts-ignore
  return dict[props.currentStep];
});

function validateEmail() {
  // eslint-disable-next-line
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  invalidEmail.value = email.value.length === 0 || !emailRegex.test(email.value);
}

function sendEmail() {
  validateEmail();

  if (invalidEmail.value) return;

  emit('sendEmailResetPass', email.value);
}

function goInitialSingIn() {
  emit('goSignIn');
}

function submitForm() {
  if (props.currentStep === AuthStepEnum.resetPassword) {
    sendEmail();
  }
}

onMounted(() => {
  email.value = props.initialEmail;
});
</script>
