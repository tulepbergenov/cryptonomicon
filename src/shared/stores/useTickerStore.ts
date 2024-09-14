import { defineStore } from "pinia";
import { ref } from "vue";
import { TickerType } from "../types";

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

  return {
    tickers,
    addTicker,
    removeTicker,
    selectedTicker,
    setSelectedTicker,
    removeSelectedTicker,
  };
});
