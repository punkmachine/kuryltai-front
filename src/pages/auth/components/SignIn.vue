<template>
  <div class="w-full sm:w-auto">
    <h1 class="mb-7">Вход</h1>

    <button
      v-if="currentStep === AuthStepEnum.signInEmail"
      class="btn btn--with-icon"
      @click="googleAuthClick"
    >
      <svg>
        <use xlink:href="@/assets/icons/sprites/social.svg#google"></use>
      </svg>
      <span> ЧЕРЕЗ GOOGLE </span>
    </button>

    <p
      v-if="currentStep === AuthStepEnum.signInEmail"
      class="my-3 text-center text-sm text-blue-gray-500"
    >
      или
    </p>

    <form
      class="flex w-full flex-col gap-3.5 sm:w-96"
      @submit.prevent="submitForm"
    >
      <UIInput
        v-model="email"
        label="Эл. почта"
        placeholder="example@mail.com"
        autocomplete="email"
        :disabled="currentStep === AuthStepEnum.signInPassword"
        :invalid="invalidEmail"
      />
      <UIInput
        v-if="currentStep === AuthStepEnum.signInPassword"
        v-model="password"
        id="password"
        type="password"
        placeholder="*********"
        label="Пароль"
        :invalid="invalidPassword"
      >
        <template #inner-icon-right>
          <span
            class="input__inner-icon-right cursor-pointer"
            @click="changeTypeInput('password')"
          >
            <svg>
              <use xlink:href="@/assets/icons/sprites/inputs.svg#eye-close"></use>
            </svg>
          </span>
        </template>
      </UIInput>

      <button
        type="submit"
        class="btn btn--primary"
      >
        {{ currentStep === AuthStepEnum.signInEmail ? 'Продолжить' : 'Войти' }}
      </button>
    </form>

    <div
      v-if="currentStep === AuthStepEnum.signInPassword"
      class="reset-password"
    >
      <button @click="resetPassword">Забыли пароль?</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';
import type { IPayloadLogin } from '@/entities/types/backend/user/user.payload';
import { AuthStepEnum } from '../types';

interface IProps {
  currentStep: AuthStepEnum;
}

interface IEmits {
  (e: 'updateCurrentStep', email: string): void;
  (e: 'goToApp', data: IPayloadLogin): void;
  (e: 'goToResetPassword', email: string): void;
  (e: 'googleAuthClick'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const email = ref<string>('');
const password = ref<string>('');
const invalidPassword = ref<boolean>(false);
const invalidEmail = ref<boolean>(false);

function validateEmail() {
  // eslint-disable-next-line
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  invalidEmail.value = email.value.length === 0 || !emailRegex.test(email.value);
}

function validatePassword() {
  invalidPassword.value = password.value.length === 0;
}

function changeTypeInput(inputId: string) {
  const input: HTMLInputElement | null = document.querySelector(`input#${inputId}`);

  if (input) {
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }
}

function goToPassword() {
  validateEmail();

  if (invalidEmail.value) return;

  emit('updateCurrentStep', email.value);
}

function goToInApp() {
  validatePassword();

  if (invalidPassword.value) return;

  emit('goToApp', { email: email.value, password: password.value });
}

function resetPassword() {
  emit('goToResetPassword', email.value);
}

function googleAuthClick() {
  emit('googleAuthClick');
}

function submitForm() {
  if (props.currentStep === AuthStepEnum.signInEmail) {
    goToPassword();
  }

  if (props.currentStep === AuthStepEnum.signInPassword) {
    goToInApp();
  }
}
</script>

<style scoped>
.reset-password {
  @apply mt-6 text-right text-sm font-medium text-blue-gray-900;
}
</style>
