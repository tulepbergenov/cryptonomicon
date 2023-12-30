<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import {
  windowDisableScrolling,
  windowEnableScrolling,
  findTicker,
} from "@/utils";
import VAppPreloader from "@/components/VAppPreloader.vue";
import VSelectedTickerChart from "@/components/VSelectedTickerChart.vue";
import VTickers from "@/components/VTickers.vue";
import VAddTickerForm from "@/components/VAddTickerForm.vue";
import { getCoinList } from "@/api";
import VHero from "@/components/VHero.vue";

const isLoading = ref(false);
const formCreateTickerNewTicker = ref("");
const coins: Ref<string[]> = ref([]);
const tickers = ref(["VUE", "REACT"]);
const selectedTicker: Ref<string | null> = ref(tickers.value[0]);
const isTickerExistsErrorShow = ref(false);

onMounted(() => {
  isLoading.value = true;
  windowDisableScrolling();

  getCoinList()
    .then((res) => {
      isLoading.value = false;
      windowEnableScrolling();
      coins.value = res;
    })
    .catch(() => {
      isLoading.value = false;
      windowEnableScrolling();
    });
});

const handleAddTicker = (name?: string) => {
  if (name) {
    const tickerExists = findTicker(name, tickers.value);

    if (!tickerExists) {
      tickers.value.push(name);
      resetTickerForm();
    }
  }

  if (!formCreateTickerNewTicker.value.trim().length) {
    formCreateTickerNewTicker.value = "";

    return;
  }

  const tickerExists = findTicker(
    formCreateTickerNewTicker.value,
    tickers.value,
  );

  if (!tickerExists) {
    tickers.value.push(formCreateTickerNewTicker.value);
    resetTickerForm();
  }
};

const handleCloseSelectedTickerChart = () => {
  selectedTicker.value = null;
};

const handleSelectTicker = (name: string) => {
  selectedTicker.value = name;
};

const handleDeleteTicker = (name: string) => {
  tickers.value = tickers.value.filter((ticker) => {
    if (name === selectedTicker.value) {
      selectedTicker.value = null;
    }

    if (ticker !== name) {
      return ticker;
    }
  });
};

const resetTickerForm = () => {
  formCreateTickerNewTicker.value = "";
};
</script>

<template>
  <main class="flex-auto pb-32 pt-10">
    <VAppPreloader :is-loading="isLoading" />
    <VHero />
    <VAddTickerForm
      :coins="coins"
      :on-add-ticker="handleAddTicker"
      :is-ticker-exists-error-show="isTickerExistsErrorShow"
    />
    <VTickers
      :tickers="tickers"
      :selected-ticker="selectedTicker"
      :on-select-ticker="handleSelectTicker"
      :on-delete-ticker="handleDeleteTicker"
    />
    <VSelectedTickerChart
      :selected-ticker="selectedTicker"
      :on-close-selected-ticker-chart="handleCloseSelectedTickerChart"
    />
  </main>
</template>
