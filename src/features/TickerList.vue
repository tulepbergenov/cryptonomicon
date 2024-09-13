<script setup lang="ts">
import { useTickerStore } from "@/shared/stores";
import TickerListItem from "./TickerListItem.vue";

const tickerStore = useTickerStore();
</script>

<template>
  <div class="mt-5 grid md:grid-cols-2 gap-5 lg:grid-cols-3">
    <TickerListItem
      :ticker="ticker"
      :key="ticker.id"
      v-for="ticker in tickerStore.tickers"
    />
  </div>
</template>
