<template>
  <main class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-800 mb-4">404</h1>
      <p class="text-3xl text-gray-600 mb-8">Page Not Found</p>
      <router-link to="/" class="text-2xl text-blue-500 hover:text-blue-700 hover:underline">
        Go back to Home
      </router-link>
    </div>
  </main>
</template>

<script lang="ts" setup>
</script>

<style scoped>
main {
  @apply bg-gray-100 min-h-screen flex flex-col items-center justify-center;
}

h1 {
  @apply text-9xl font-bold text-gray-800 mb-4;
}

p {
  @apply text-3xl text-gray-600 mb-8;
}

img {
  @apply w-1/2 h-auto mb-8;
}

a {
  @apply text-2xl text-blue-500 hover:text-blue-700 hover:underline;
}
</style>
