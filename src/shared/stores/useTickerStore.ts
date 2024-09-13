import { defineStore } from "pinia";
import { TickerType } from "../types";
import { computed, ref } from "vue";

export const useTickerStore = defineStore("tickerStoreId", () => {
  const tickers = ref<TickerType[]>([]);

  const selectedTicker = ref<TickerType | null>(null);

  const addTicker = (ticker: TickerType) => {
    tickers.value.push(ticker);
  };

  const removeTicker = (tickerId: string) => {
    tickers.value = tickers.value.filter((ticker) => ticker.id !== tickerId);

    if (selectedTicker.value?.id === tickerId) {
      selectedTicker.value = null;
    }
  };

  const setSelectedTicker = (ticker: TickerType) => {
    selectedTicker.value = ticker;
  };

  const removeSelectedTicker = () => {
    selectedTicker.value = null;
  };

  const isEmptyTickers = computed(() => tickers.value.length !== 0);

  return {
    tickers,
    addTicker,
    removeTicker,
    isEmptyTickers,
    selectedTicker,
    setSelectedTicker,
    removeSelectedTicker,
  };
});
