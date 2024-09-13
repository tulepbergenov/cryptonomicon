<script setup lang="ts">
import { useTickerStore } from "@/shared/stores";
import { XCircleIcon } from "@heroicons/vue/24/outline";

const tickerStore = useTickerStore();
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <span class="text-lg text-gray-900 font-bold uppercase">{{
        tickerStore.selectedTicker?.name
      }}</span>
      <button
        type="button"
        class="text-gray-500 [@media(hover:hover)]:hover:opacity-50 transition-opacity ease-in-out duration-300 active:opacity-50"
        aria-label="Close chart"
        title="Close chart"
        @click="tickerStore.removeSelectedTicker()"
      >
        <XCircleIcon class="size-7" />
      </button>
    </div>
    <ul class="flex items-end border-gray-400 border-b border-l h-64 mt-6 p-2">
      <li class="bg-purple-800 border w-10 h-24"></li>
      <li class="bg-purple-800 border w-10 h-32"></li>
      <li class="bg-purple-800 border w-10 h-48"></li>
      <li class="bg-purple-800 border w-10 h-16"></li>
    </ul>
  </div>
</template>
