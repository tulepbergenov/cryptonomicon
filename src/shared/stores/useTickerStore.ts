import { defineStore } from "pinia";
import { ref } from "vue";
import { TickerType } from "../types";
import { coinService } from "../api";

export const useTickerStore = defineStore("tickerStoreId", () => {
  const tickers = ref<TickerType[]>([]);
  const chart = ref<number[]>([]);

  const selectedTicker = ref<TickerType | null>(null);

  const addTicker = (ticker: Omit<TickerType, "intervalId">) => {
    const intervalId = setInterval(() => {
      coinService.getCoinPrice(ticker.name).then((res) => {
        updateTickerPrice(ticker.name, res.data.USD);
      });
    }, 3000);

    tickers.value.push({ ...ticker, intervalId });
  };

  const removeTicker = (tickerId: string) => {
    tickers.value = tickers.value.filter((ticker) => {
      if (ticker.id === tickerId) {
        clearInterval(ticker.intervalId);
      }

      return ticker.id !== tickerId;
    });

    if (selectedTicker.value?.id === tickerId) {
      selectedTicker.value = null;
      chart.value = [];
    }
  };

  const updateTickerPrice = (tickerId: string, price: number) => {
    const ticker = tickers.value.find((ticker) => ticker.id === tickerId);

    if (ticker) {
      ticker.price = price;

      if (selectedTicker.value?.id === tickerId) {
        chart.value.push(price);
      }
    }
  };

  const setSelectedTicker = (ticker: TickerType) => {
    selectedTicker.value = ticker;

    chart.value = [];
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
    updateTickerPrice,
    chart,
  };
});
