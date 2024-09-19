<script setup lang="ts">
import { useTickerStore } from "@/shared/stores";
import { computed } from "vue";

const tickerStore = useTickerStore();

const coins = computed(() => tickerStore.coins.slice(-4));

const handleAddTicker = (name: string) => {
  tickerStore.addTicker(name);
};
</script>

<template>
  <transition name="coins">
    <transition-group
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
    </transition-group>
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

<style scoped>
.coins-list-enter-active,
.coins-list-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.coins-list-enter-from,
.coins-list-leave-to {
  @apply opacity-0;
}
</style>
