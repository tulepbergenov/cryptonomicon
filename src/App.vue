<script setup lang="ts">
import AddTickerForm from "./features/AddTickerForm.vue";
import AppSpinner from "./features/AppSpinner.vue";
import ErrorBoundary from "./features/ErrorBoundary.vue";
import TickerChart from "./features/TickerChart.vue";
import TickerList from "./features/TickerList.vue";
import BaseDivider from "./shared/bases/BaseDivider.vue";
import { useTickerStore } from "./shared/stores";

const tickerStore = useTickerStore();
</script>

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
      <div class="container" v-if="tickerStore.isEmptyTickers">
        <BaseDivider />
      </div>
      <section>
        <div class="container">
          <div>
            <TickerList />
          </div>
        </div>
      </section>
      <div class="container" v-if="tickerStore.selectedTicker">
        <BaseDivider />
      </div>
      <section v-if="tickerStore.selectedTicker">
        <div class="container">
          <div>
            <TickerChart />
          </div>
        </div>
      </section>
    </main>
  </ErrorBoundary>
</template>
