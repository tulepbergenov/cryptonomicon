<template>
  <div
    v-if="coinsQuery.isPending.value"
    class="fixed w-svw h-svh bg-purple-800/80 inset-0 z-50 flex items-center justify-center"
  >
    <SpinnerIcon class="-ml-1 mr-3 h-12 w-12 text-white" />
  </div>
</template>

<script lang="ts" setup>
import { coinService } from "@/shared/api";
import SpinnerIcon from "@/shared/icons/SpinnerIcon.vue";
import { objectToArray } from "@/shared/libs";
import { useTickerStore } from "@/shared/stores";
import { useMutation } from "@tanstack/vue-query";
import axios from "axios";
import { onMounted } from "vue";
import { toast } from "vue-sonner";

const body = document.body;

const tickerStore = useTickerStore();

const coinsQuery = useMutation({
  mutationFn: () => coinService.getCoinList(),
  mutationKey: ["coins"],
  onSuccess: (response) => {
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
  },
  onError: (error) => {
    if (axios.isAxiosError(error)) {
      toast.error(error.message);
    } else {
      console.error(error);

      toast.error(`${error}`);
    }
  },
  onSettled: () => {
    body.style.overflow = "visible";
  },
});

onMounted(() => {
  body.style.overflow = "hidden";

  coinsQuery.mutate();
});
</script>
