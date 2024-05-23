<template>
  <div class="w-full sm:w-auto">
    <h1 class="mb-7">Восстановление пароля</h1>

    <form
      class="flex w-full flex-col gap-3.5 sm:w-96"
      @submit.prevent="submitForm"
    >
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
        type="secondPassword"
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

      <button
        type="submit"
        class="btn btn--primary"
      >
        Вернуться
      </button>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { defineEmits, ref } from 'vue';
import UIInput from '@/components/ui/UIInput.vue';
import type { IPayloadResetPass } from '@/entities/types/backend/user/user.payload';

interface IEmits {
  (e: 'sendNewPassword', data: IPayloadResetPass): void;
}

const emit = defineEmits<IEmits>();

const password = ref<string>('');
const secondPassword = ref<string>('');
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

  if (invalidPassword.value || invalidSecondPassword.value) return;

  //@ts-ignore
  emit('sendNewPassword', { password: password.value, confirm_password: secondPassword.value });
}
</script>
