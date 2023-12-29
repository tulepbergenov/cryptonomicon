<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import {
  windowDisableScrolling,
  windowEnableScrolling,
  findTicker,
} from "@/utils";
import VAppPreloader from "@/components/VAppPreloader.vue";
import { getCoinList } from "@/api";

const isLoading = ref(false);
const formCreateTickerNewTicker = ref("");
const coins: Ref<string[]> = ref([]);
const tickers = ref(["VUE", "REACT"]);
const selectedTicker: Ref<string | null> = ref(tickers.value[0]);
const tickerExistsErrorShow = ref(false);

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

const createTicker = (name?: string) => {
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

const closeSelectedTickerChart = () => {
  selectedTicker.value = null;
};

const selectTicker = (name: string) => {
  selectedTicker.value = name;
};

const deleteTicker = (name: string) => {
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
    <section class="sr-only">
      <header>
        <h1>Cryptonomicon</h1>
      </header>
    </section>
  </main>
</template>
