<script lang="ts" setup>
import SpinnerIcon from "@/shared/icons/SpinnerIcon.vue";
import { onMounted, ref } from "vue";

const isLoading = ref(true);
const body = document.body;

onMounted(() => {
  body.style.overflow = "hidden";

  setTimeout(() => {
    isLoading.value = false;

    body.style.overflow = "visible";
  }, 1500);
});
</script>

<template>
  <Transition name="app-spinner">
    <div
      v-if="isLoading"
      class="fixed w-svw h-svh bg-purple-800/80 inset-0 z-50 flex items-center justify-center"
    >
      <SpinnerIcon class="-ml-1 mr-3 h-12 w-12 text-white" />
    </div>
  </Transition>
</template>

<style scoped>
.app-spinner-enter-active,
.app-spinner-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.app-spinner-enter-from,
.app-spinner-leave-to {
  opacity: 0;
}
</style>
