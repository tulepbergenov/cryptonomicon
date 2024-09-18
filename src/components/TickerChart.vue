<script setup lang="ts">
import { useTickerStore } from "@/shared/stores";
import { XCircleIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";

const tickerStore = useTickerStore();

const normalizedChart = computed(() => {
  const maxValue = Math.max(...tickerStore.chart);
  const minValue = Math.min(...tickerStore.chart);

  return tickerStore.chart.map(
    (price) => 5 + (price - minValue * 95) / (maxValue - minValue)
  );
});

console.log(normalizedChart.value);
</script>

<template>
  <transition name="ticker-chart">
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
          <x-circle-icon class="size-7" />
        </button>
      </div>
      <ul
        class="flex items-end border-gray-400 border-b border-l h-64 mt-6 p-2"
      >
        <li
          v-for="bar in normalizedChart"
          :key="bar"
          class="bg-purple-800 border w-10"
          :style="{
            height: `${bar}%`,
          }"
        />
      </ul>
    </div>
  </transition>
</template>

<style scoped>
.ticker-chart-enter-active,
.ticker-chart-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.ticker-chart-enter-from,
.ticker-chart-leave-to {
  @apply opacity-0;
}
</style>
