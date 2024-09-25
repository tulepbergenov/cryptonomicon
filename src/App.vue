<template>
  <ErrorBoundary>
    <main class="flex-auto mb-20">
      <h1 class="sr-only">
        Cryptonomicon tracks live currency and crypto rates 📈
      </h1>
      <AppSpinner />
      <section class="mt-10">
        <div class="container">
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <AddTickerForm />
          </div>
        </div>
      </section>
      <section v-if="isNotEmptyTickerList">
        <div class="container">
          <BaseDivider />
          <div>
            <TickerList />
          </div>
        </div>
      </section>
      <section v-if="isSelectedTicker">
        <div class="container">
          <BaseDivider />
          <div>
            <TickerChart />
          </div>
        </div>
      </section>
    </main>
    <Toaster rich-colors position="top-right" />
  </ErrorBoundary>
</template>

<script setup lang="ts">
import AddTickerForm from "@/components/AddTickerForm.vue";
import AppSpinner from "@/components/AppSpinner.vue";
import ErrorBoundary from "@/components/ErrorBoundary.vue";
import TickerChart from "@/components/TickerChart.vue";
import TickerList from "@/components/TickerList.vue";
import BaseDivider from "@/shared/bases/BaseDivider.vue";
import { Toaster } from "vue-sonner";
import { useTickerStore } from "./shared/stores";
import { computed } from "vue";

const tickerStore = useTickerStore();

const isNotEmptyTickerList = computed(() => tickerStore.tickers.length !== 0);

const isSelectedTicker = computed(() => tickerStore.selectedTicker);
</script>
