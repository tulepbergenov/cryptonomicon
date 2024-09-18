<script setup lang="ts">
import { useTickerStore } from "@/shared/stores";
import { computed } from "vue";

const tickerStore = useTickerStore();

const coinLength = computed(() => tickerStore.coins.length);
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
        {{ coinLength }}
      </button>
    </li>
  </ul>
</template>
