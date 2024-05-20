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
      @googleAuthClick="googleAuthClick"
    />

    <ResetPassword
      v-if="currentStep === AuthStepEnum.resetPassword || currentStep === AuthStepEnum.resetPasswordAfterSendEmail"
      :initial-email="emailForResetPass"
      :current-step="currentStep"
      @sendEmailResetPass="sendEmailForgetPass"
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
import { ref, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { toast } from 'vue3-toastify';
import Cookies from 'js-cookie';

import { api } from '@/api';

import SignIn from './components/SignIn.vue';
import ResetPassword from './components/ResetPassword.vue';
import NewPassword from './components/NewPassword.vue';
import SignUp from './components/SignUp.vue';

import { googleAuthUrl, scopeGoogle } from '@/entities/constants/googleAuth';

import type { IPayloadLogin, IPayloadResetPass, IPayloadSignUp } from '@/entities/types/backend/user/user.payload';
import type { IResponseLogin } from '@/entities/types/backend/user/user.response';
import { AuthStepEnum } from './types';
import type { IResponseStandard } from '@/entities/types/backend/responses';

const router = useRouter();
const route = useRoute();

const currentStep = ref<AuthStepEnum>(AuthStepEnum.signInEmail);
const emailForResetPass = ref<string>('');
const emailForSignUp = ref<string>('');
const resetPassData = reactive({
  securityToken: '',
  uuid: '',
});

function nextStep(email: string) {
  api.auth
    .checkEmail({ email })
    .then(() => {
      currentStep.value = AuthStepEnum.signInPassword;
    })
    .catch(error => setSignUpStep(error.response.status));

  emailForSignUp.value = email;
}

function setSignUpStep(status: number) {
  if (status === 400) {
    currentStep.value = AuthStepEnum.signUp;
  }
}

function authorizeUser(data: IPayloadLogin) {
  api.auth.login(data).then(successAuthUser);
}

function successAuthUser(data: IResponseLogin) {
  Cookies.set('access', data.access);
  Cookies.set('refresh', data.refresh);

  router.push('/');
}

function resetPasswordClick(email: string) {
  emailForResetPass.value = email;
  currentStep.value = AuthStepEnum.resetPassword;
}

function sendEmailForgetPass(email: string) {
  api.auth.forgetPassword({ email }).then(data => {
    toast.info(data.message);
    currentStep.value = AuthStepEnum.resetPasswordAfterSendEmail;
  });
}

function goSignIn() {
  currentStep.value = AuthStepEnum.signInEmail;
}

function sendNewPassword(data: IPayloadResetPass) {
  api.auth
    .resetPassword({
      ...data,
      security_token: resetPassData.securityToken,
      profile_uuid: resetPassData.uuid,
    })
    .then(sendNewPasswordSuccess);
}

function sendNewPasswordSuccess(data: IResponseStandard) {
  toast.info(data.message);

  currentStep.value = AuthStepEnum.signInEmail;
  router.push('/auth');
}

function signUpUser(data: IPayloadSignUp) {
  api.auth.signUp(data).then(() => {
    currentStep.value = AuthStepEnum.signInPassword;
  });
}

function googleAuthClick() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_APP_GOOGLE_REDIRECT_URL,
    prompt: 'select_account',
    access_type: 'offline',
    scope: scopeGoogle,
  });

  window.location.href = `${googleAuthUrl}?${params}`;
}

function setNewPasswordQuery() {
  // @ts-ignore
  resetPassData.securityToken = route.query.sec || '';
  // @ts-ignore
  resetPassData.uuid = route.query.p || '';
}

function googleAuthByRedirectUrl() {
  const query = route.fullPath.replace('step=google-redirect&', '').split('?');

  api.auth.googleAuth(`?${query[1]}`).then(successAuthUser);
}

onMounted(() => {
  const stepParam = route.query.step as AuthStepEnum | undefined;

  if (stepParam && Object.values(AuthStepEnum).includes(stepParam)) {
    currentStep.value = stepParam;

    if (currentStep.value === AuthStepEnum.newPassword) {
      setNewPasswordQuery();
    }

    if (currentStep.value === AuthStepEnum.googleRedirect) {
      googleAuthByRedirectUrl();
    }
  }
});
</script>

<style scoped>
.auth-page {
  @apply flex h-full w-full flex-col items-center justify-center px-8;
}
</style>
