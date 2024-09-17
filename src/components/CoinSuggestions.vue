<script setup lang="ts">
import { getCoinList } from "@/shared/api";
import axios from "axios";
import { onMounted } from "vue";
import { Toaster, toast } from "vue-sonner";

onMounted(() => {
  getCoinList()
    .then((response) => {
      if (response.data.Response === "Error") {
        try {
          throw new Error(response.data.Message);
        } catch (error) {
          toast.error(`${error}`);
          return;
        }
      }
      console.log("response", response.data);
    })
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.log("axios error", error);
      } else {
        console.log("error", error);
      }
    });
});
</script>

<template>
  <ul
    class="flex bg-white shadow-md p-2 rounded-md flex-wrap items-center gap-1"
  >
    <li class="flex">
      <button
        type="button"
        class="inline-block items-center px-2 rounded-md text-xs bg-gray-300 text-gray-800 cursor-pointer [@media(hover:hover)]:hover:opacity-60 transition-opacity ease-in-out duration-300 active:opacity-60"
      >
        BTC
      </button>
    </li>
  </ul>
  <Toaster position="top-right" richColors />
</template>
