<template>
  <div class="tag">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.tag {
  @apply flex h-6 items-center justify-center rounded bg-blue-gray-50 px-2 py-1 text-xs font-bold;
}
</style>
