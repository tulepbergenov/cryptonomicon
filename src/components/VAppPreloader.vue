<script setup lang="ts">
interface Props {
  isLoading: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <Transition name="app-preloader">
    <section
      v-if="props.isLoading"
      class="w-100 h-100 fixed inset-0 z-50 flex items-center justify-center bg-purple-800 opacity-80"
    >
      <svg
        class="h-12 w-12 animate-spin text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg></section
  ></Transition>
</template>

<style scoped>
.app-preloader-enter-active,
.app-preloader-leave-active {
  transition: opacity 0.2s ease-in-out 0s;
}

.app-preloader-enter-from,
.app-preloader-leave-to {
  opacity: 0;
}
</style>
