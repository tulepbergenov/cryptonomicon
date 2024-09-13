<script setup lang="ts">
import { onErrorCaptured, ref } from "vue";

const error = ref<Error | null>(null);
const errorMessage = ref<string | null>(null);

onErrorCaptured((err) => {
  error.value = err;
  errorMessage.value = err.message;
  return false;
});
</script>

<template>
  <main v-if="error">
    <section class="flex flex-col items-center py-20">
      <h1 class="text-3xl font-bold">Oops! Something went wrong.</h1>
      <p class="mt-2">
        We encountered an unexpected error. Please try again later.
      </p>
      <pre
        class="mt-3 w-2/5 flex items-center justify-center border border-slate-400 text-red-500 text-center bg-slate-300 px-2 py-1 rounded-md"
        >{{ errorMessage }}</pre
      >
    </section>
  </main>
  <slot v-else />
</template>
