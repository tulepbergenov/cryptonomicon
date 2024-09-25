<template>
  <ul
    v-if="coins.length"
    name="coins-list"
    tag="ul"
    class="flex bg-white shadow-md p-2 rounded-md flex-wrap items-center gap-1"
  >
    <li v-for="coin in coins" :key="coin.Id" class="flex">
      <BaseBadge type="button" @click="addTicker(coin.keyName)">
        {{ coin.keyName }}
      </BaseBadge>
    </li>
  </ul>
</template>

<script setup lang="ts">
import BaseBadge from "@/shared/bases/BaseBadge.vue";
import { useTickerStore } from "@/shared/stores";
import { computed } from "vue";

type PropsType = {
  ticker: string;
  addTicker: (name: string) => void;
};

const { ticker = "", addTicker } = defineProps<PropsType>();

const tickerStore = useTickerStore();

const coins = computed(() => {
  if (ticker) {
    return tickerStore.coins
      .filter((coin) => coin.keyName.includes(ticker!.toUpperCase()))
      .slice(-4);
  }

  return tickerStore.coins.slice(-4);
});
</script>
