<template>
  <main class="flex min-h-screen flex-col items-center justify-center bg-gray-100">
    <div class="text-center">
      <h1 class="mb-4 text-9xl font-bold text-gray-800">404</h1>
      <p class="mb-8 text-3xl text-gray-600">Page Not Found</p>
      <router-link
        to="/"
        class="text-2xl text-blue-500 hover:text-blue-700 hover:underline"
      >
        Go back to Home
      </router-link>
    </div>
  </main>
</template>

<script lang="ts" setup></script>

<style scoped>
main {
  @apply flex min-h-screen flex-col items-center justify-center bg-gray-100;
}

h1 {
  @apply mb-4 text-9xl font-bold text-gray-800;
}

p {
  @apply mb-8 text-3xl text-gray-600;
}

img {
  @apply mb-8 h-auto w-1/2;
}

a {
  @apply text-2xl text-blue-500 hover:text-blue-700 hover:underline;
}
</style>
