<template>
  <div class="w-full sm:w-auto">
    <h1 class="mb-7">Регистрация</h1>

    <form
      class="flex sm:w-96 w-full flex-col gap-3.5"
      @submit.prevent="submitForm"
    >
      <UIInput
        v-model="email"
        label="Эл. почта"
        placeholder="example@mail.com"
        autocomplete="email"
        disabled
        :invalid="invalidEmail"
      />

      <UIInput
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

      <UIInput
        v-model="secondPassword"
        id="secondPassword"
        type="password"
        placeholder="*********"
        label="Подтвердите пароль"
        :invalid="invalidSecondPassword"
      >
        <template #inner-icon-right>
          <span
            class="input__inner-icon-right cursor-pointer"
            @click="changeTypeInput('secondPassword')"
          >
            <svg>
              <use xlink:href="@/assets/icons/sprites/inputs.svg#eye-close"></use>
            </svg>
          </span>
        </template>
      </UIInput>

      <div class="flex items-center gap-2">
        <input
          v-model="checkedPolicy"
          type="checkbox"
          name=""
        />
        <p class="text-sm font-medium text-blue-gray-400">
          Я согласен(-а) с
          <a
            class="text-gray-900 underline"
            href="#"
            >Условиями использования</a
          >
        </p>
      </div>

      <button
        type="submit"
        class="btn btn--primary"
      >
        Продолжить
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits, defineProps, onMounted } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';
import type { IPayloadSignUp } from '@/types/backend/user/user.payload';

interface IProps {
  initialEmail: string;
}

interface IEmits {
  (e: 'signUpEmit', data: IPayloadSignUp): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const email = ref<string>('');
const password = ref<string>('');
const secondPassword = ref<string>('');
const checkedPolicy = ref<boolean>(false);
const invalidEmail = ref<boolean>(false);
const invalidPassword = ref<boolean>(false);
const invalidSecondPassword = ref<boolean>(false);

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

function validatePassword() {
  invalidPassword.value = password.value.length === 0;
  invalidSecondPassword.value = secondPassword.value.length === 0 || secondPassword.value !== password.value;
}

function submitForm() {
  validatePassword();

  if (invalidPassword.value || invalidSecondPassword.value || !checkedPolicy.value) return;

  emit('signUpEmit', {
    email: email.value,
    password: password.value,
    confirm_password: secondPassword.value,
  });
}

onMounted(() => {
  email.value = props.initialEmail;
});
</script>
