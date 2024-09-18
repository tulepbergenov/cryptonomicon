<script lang="ts" setup>
import { coinService } from "@/shared/api";
import SpinnerIcon from "@/shared/icons/SpinnerIcon.vue";
import { objectToArray } from "@/shared/libs";
import { useTickerStore } from "@/shared/stores";
import axios from "axios";
import { onMounted, ref } from "vue";
import { toast } from "vue-sonner";

const tickerStore = useTickerStore();

const isLoading = ref(true);
const body = document.body;

onMounted(() => {
  body.style.overflow = "hidden";

  coinService
    .getCoinList()
    .then((response) => {
      if (response.data.Response === "Error") {
        toast.error(response.data.Message);
        return;
      }

      if (response.data.Response === "Success") {
        const coins = objectToArray(response.data.Data);

        tickerStore.setCoins(coins);

        return;
      }

      throw new Error("Something went wrong");
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.message);
      } else {
        toast.error(`${error}`);
      }
    })
    .finally(() => {
      isLoading.value = false;
      body.style.overflow = "visible";
    });
});
</script>

<template>
  <transition name="app-spinner">
    <div
      v-if="isLoading"
      class="fixed w-svw h-svh bg-purple-800/80 inset-0 z-50 flex items-center justify-center"
    >
      <spinner-icon class="-ml-1 mr-3 h-12 w-12 text-white" />
    </div>
  </transition>
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
