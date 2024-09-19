<script setup lang="ts">
import { useTickerStore } from "@/shared/stores";
import { computed } from "vue";

const { ticker = "", resetForm } = defineProps<{
  ticker: string;
  resetForm: () => void;
}>();

const tickerStore = useTickerStore();

const coins = computed(() => {
  if (ticker) {
    return tickerStore.coins
      .filter((coin) => coin.keyName.includes(ticker!.toUpperCase()))
      .slice(-4);
  }

  return tickerStore.coins.slice(-4);
});

const handleAddTicker = (name: string) => {
  tickerStore.addTicker(name);

  if (ticker.length) {
    resetForm();
  }
};
</script>

<template>
  <transition name="coins">
    <ul
      v-if="coins.length"
      name="coins-list"
      tag="ul"
      class="flex bg-white shadow-md p-2 rounded-md flex-wrap items-center gap-1"
    >
      <li v-for="coin in coins" :key="coin.Id" class="flex">
        <button
          @click="handleAddTicker(coin.keyName)"
          type="button"
          class="inline-block items-center px-2 rounded-md text-xs bg-gray-300 text-gray-800 cursor-pointer [@media(hover:hover)]:hover:opacity-60 transition-opacity ease-in-out duration-300 active:opacity-60"
        >
          {{ coin.keyName }}
        </button>
      </li>
    </ul>
  </transition>
</template>

<style scoped>
.coins-enter-active,
.coins-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.coins-enter-from,
.coins-leave-to {
  @apply opacity-0;
}
</style>
