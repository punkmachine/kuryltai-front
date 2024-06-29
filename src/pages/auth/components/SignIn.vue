<template>
  <div class="w-full sm:w-auto">
    <h1 class="mb-7">Вход</h1>

    <button
      v-if="currentStep === AuthStepEnum.signInEmail"
      class="btn btn--with-icon"
      @click="googleAuthClick"
    >
      <!-- @todo: мне уже влом со спрайтом разбираться -->
      <svg xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2_981)">
          <path d="M16.344 8.18428C16.344 7.64046 16.2999 7.0937 16.2059 6.5587H8.66V9.63936H12.9812C12.8018 10.6329 12.2257 11.5119 11.382 12.0704V14.0693H13.96C15.4739 12.6759 16.344 10.6182 16.344 8.18428Z" fill="#4285F4"/>
          <path d="M8.65999 16.0005C10.8176 16.0005 12.6372 15.2921 13.963 14.0693L11.385 12.0704C10.6677 12.5583 9.74175 12.8346 8.66293 12.8346C6.57585 12.8346 4.80624 11.4266 4.17129 9.53353H1.51099V11.5942C2.86907 14.2956 5.63519 16.0005 8.65999 16.0005Z" fill="#34A853"/>
          <path d="M4.16836 9.53353C3.83325 8.53996 3.83325 7.46408 4.16836 6.47051V4.40988H1.511C0.376337 6.6704 0.376337 9.33364 1.511 11.5942L4.16836 9.53353Z" fill="#FBBC04"/>
          <path d="M8.65999 3.16644C9.80054 3.1488 10.9029 3.57798 11.7289 4.36578L14.0129 2.08174C12.5667 0.72367 10.6471 -0.0229773 8.65999 0.000539111C5.63519 0.000539111 2.86907 1.70548 1.51099 4.40987L4.16835 6.4705C4.80036 4.57449 6.57291 3.16644 8.65999 3.16644Z" fill="#EA4335"/>
        </g>
        <defs>
          <clipPath id="clip0_2_981">
            <rect width="16" height="16" fill="white" transform="translate(0.5)"/>
          </clipPath>
        </defs>
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
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';
import type { IPayloadLogin } from '@/entities/types/backend/user/user.payload';
import { AuthStepEnum } from '../types';

interface IProps {
  currentStep: AuthStepEnum;
  initialEmail: string;
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

onMounted(() => {
  email.value = props.initialEmail;
});
</script>

<style scoped>
.reset-password {
  @apply mt-6 text-right text-sm font-medium text-blue-gray-900;
}
</style>
