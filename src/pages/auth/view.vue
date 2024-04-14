<template>
  <div class="auth-page">
    <div class="mb-14">
      <img
        src="@/assets/icons/logo.svg"
        alt=""
      />
    </div>

    <SignIn
      v-if="currentStep === AuthStepEnum.signInEmail || currentStep === AuthStepEnum.signInPassword"
      :current-step="currentStep"
      @updateCurrentStep="nextStep"
      @goToApp="authorizeUser"
      @goToResetPassword="resetPasswordClick"
    />

    <ResetPassword
      v-if="currentStep === AuthStepEnum.resetPassword || currentStep === AuthStepEnum.resetPasswordAfterSendEmail"
      :initial-email="emailForResetPass"
      :current-step="currentStep"
      @sendEmailResetPass="sendEmailResetPass"
      @goSignIn="goSignIn"
    />

    <NewPassword
      v-if="currentStep === AuthStepEnum.newPassword"
      @sendNewPassword="sendNewPassword"
    />

    <SignUp
      v-if="currentStep === AuthStepEnum.signUp"
      :initial-email="emailForSignUp"
      @signUpEmit="signUpUser"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import SignIn from './components/SignIn.vue';
import ResetPassword from './components/ResetPassword.vue';
import NewPassword from './components/NewPassword.vue';
import SignUp from './components/SignUp.vue';

import type { IPayloadLogin, IPayloadSignUp } from '@/types/backend/user/user.payload';
import { AuthStepEnum } from './types';

const router = useRouter();
const route = useRoute();

const currentStep = ref<AuthStepEnum>(AuthStepEnum.signInEmail);
const emailForResetPass = ref<string>('');
const emailForSignUp = ref<string>('');

function nextStep(email: string) {
  // отправить email на бэк для проверки нахождения его в бд;
  // если его нет в бд, задать step с регистрацией

  currentStep.value = AuthStepEnum.signInPassword;
  // currentStep.value = AuthStepEnum.signUp;
  emailForSignUp.value = email;
}

function authorizeUser(data: IPayloadLogin) {
  // отправить запрос на бэк для авторизации

  router.push('/');
}

function resetPasswordClick(email: string) {
  emailForResetPass.value = email;
  currentStep.value = AuthStepEnum.resetPassword;
}

function sendEmailResetPass(email: string) {
  currentStep.value = AuthStepEnum.resetPasswordAfterSendEmail;

  // отправить email на бэк, чтобы восстановить пароль
}

function goSignIn() {
  currentStep.value = AuthStepEnum.signInEmail;
}

function sendNewPassword() {
  // запрос на бэк
  currentStep.value = AuthStepEnum.signInEmail;
  router.push('/auth');
}

function signUpUser(data: IPayloadSignUp) {
  // регистрация пользователя

  router.push('/');
}

onMounted(() => {
  const stepParam = route.query.step as AuthStepEnum | undefined;

  if (stepParam && Object.values(AuthStepEnum).includes(stepParam)) {
    currentStep.value = stepParam;
  }
});
</script>

<style scoped>
.auth-page {
  @apply flex h-full w-full flex-col items-center justify-center;
}
</style>
