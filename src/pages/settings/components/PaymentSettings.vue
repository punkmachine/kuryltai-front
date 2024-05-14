<template>
  <div>
    <div class="grid grid-cols-2 items-center border border-solid border-gray-300 bg-gray-100 px-4 py-3">
      <span class="text-xs font-medium text-blue-gray-500">Карта</span>
      <span class="text-xs font-medium text-blue-gray-500">Дата добавления</span>
    </div>

    <div class="flex flex-col">
      <div class="grid grid-cols-2 border-b border-solid border-gray-300 py-3">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center rounded-md border border-solid border-gray-300 px-2">
            <svg class="h-8 w-8">
              <use xlink:href="@/assets/icons/sprites/cards.svg#visa"></use>
            </svg>
          </div>

          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-900">Visa 1234</span>
            <span class="text-sm text-blue-gray-500">До 06/2026</span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-sm text-blue-gray-500"> 12.04.2024 15:42 </span>

          <button @click="() => {}">
            <svg class="h-5 w-5">
              <use xlink:href="@/assets/icons/sprites/btns.svg#settings"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="grid grid-cols-2 py-3">
        <div class="flex items-center gap-4">
          <div class="flex items-center justify-center rounded-md border border-solid border-gray-300 px-2">
            <svg class="h-8 w-8">
              <use xlink:href="@/assets/icons/sprites/cards.svg#mastercard"></use>
            </svg>
          </div>

          <div class="flex flex-col">
            <span class="text-sm font-medium text-gray-900">Mastercard 1234</span>
            <span class="text-sm text-blue-gray-500">До 06/2026</span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <span class="text-sm text-blue-gray-500"> 12.04.2024 15:42 </span>

          <button @click="() => {}">
            <svg class="h-5 w-5">
              <use xlink:href="@/assets/icons/sprites/btns.svg#settings"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="mt-7">
      <button class="btn btn--primary w-max px-8 uppercase">Добавить карту</button>
    </div>
  </div>
</template>

<script lang="ts" setup></script>
