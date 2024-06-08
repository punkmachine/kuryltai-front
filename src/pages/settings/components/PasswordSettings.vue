<template>
  <div>
    <div class="flex flex-col gap-3.5">
      <UIInput
        v-model="passwordData.currentPassword"
        type="password"
        id="current-password"
        placeholder="*********"
        required
        label="Текущий пароль"
      >
        <template #inner-icon-right>
          <span
            class="input__inner-icon-right cursor-pointer"
            @click="changeTypeInput('current-password')"
          >
            <svg>
              <use xlink:href="@/assets/icons/sprites/inputs.svg#eye-close"></use>
            </svg>
          </span>
        </template>
      </UIInput>

      <UIInput
        v-model="passwordData.newPassword"
        type="password"
        id="new-password"
        placeholder="*********"
        required
        label="Новый пароль"
      >
        <template #inner-icon-right>
          <span
            class="input__inner-icon-right cursor-pointer"
            @click="changeTypeInput('new-password')"
          >
            <svg>
              <use xlink:href="@/assets/icons/sprites/inputs.svg#eye-close"></use>
            </svg>
          </span>
        </template>
      </UIInput>

      <UIInput
        v-model="passwordData.repeatPassword"
        type="password"
        id="repeat-password"
        placeholder="*********"
        required
        label="Повторите пароль"
      >
        <template #inner-icon-right>
          <span
            class="input__inner-icon-right cursor-pointer"
            @click="changeTypeInput('repeat-password')"
          >
            <svg>
              <use xlink:href="@/assets/icons/sprites/inputs.svg#eye-close"></use>
            </svg>
          </span>
        </template>
      </UIInput>

      <button
        @click="changePassword"
        class="btn btn--primary mt-4 w-max px-10 uppercase"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { api } from '@/api';
import UIInput from '@/components/ui/UIInput.vue';

const passwordData = ref({
  currentPassword: '',
  newPassword: '',
  repeatPassword: '',
});

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

function changePassword() {
  api.auth.changePassword({
    old_password: passwordData.value.currentPassword,
    new_password: passwordData.value.newPassword,
    confirm_password: passwordData.value.repeatPassword,
  });
}
</script>
