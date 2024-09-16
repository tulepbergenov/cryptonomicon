<script setup lang="ts">
import { useTickerStore } from "@/shared/stores";
import TickerListItem from "./TickerListItem.vue";

const tickerStore = useTickerStore();
</script>

<template>
  <transition-group
    name="ticker-list"
    tag="div"
    class="mt-5 grid md:grid-cols-2 gap-5 lg:grid-cols-3"
  >
    <ticker-list-item
      :ticker="ticker"
      :key="ticker.id"
      v-for="ticker in tickerStore.tickers"
    />
  </transition-group>
</template>

<style scoped>
.ticker-list-enter-active,
.ticker-list-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.ticker-list-enter-from,
.ticker-list-leave-to {
  @apply opacity-0;
}
</style>
