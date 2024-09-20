import { defineStore } from "pinia";
import { ref } from "vue";
import { coinService } from "../api";
import { CoinType, TickerType } from "../types";
import { toast } from "vue-sonner";
import { tickerStorageService } from "../libs";

export const useTickerStore = defineStore("tickerStoreId", () => {
  const tickers = ref<TickerType[]>([]);
  const chart = ref<number[]>([]);
  const coins = ref<CoinType[]>([]);

  const selectedTicker = ref<TickerType | null>(null);

  const addTicker = (name: string) => {
    const intervalId = setInterval(() => {
      coinService.getCoinPrice(name).then((response) => {
        if ("Response" in response.data && response.data.Response === "Error") {
          toast.error(response.data.Message as string);

          removeTicker(name);
          return;
        }

        if ("USD" in response.data) {
          updateTickerPrice(name, response.data.USD);
          return;
        }

        toast.error("Invalid response");

        removeTicker(name);
      });
    }, 3000);

    tickers.value.push({
      id: name,
      name,
      price: "-",
      intervalId,
    });

    tickerStorageService.addTicker(name);
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

    tickerStorageService.removeTicker(tickerId);
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

  const setCoins = (inputCoins: CoinType[]) => {
    coins.value = inputCoins;
  };

  return {
    coins,
    tickers,
    addTicker,
    removeTicker,
    selectedTicker,
    setSelectedTicker,
    removeSelectedTicker,
    updateTickerPrice,
    chart,
    setCoins,
  };
});
