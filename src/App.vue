<script setup lang="ts">
import { computed } from "vue";
import AddTickerForm from "./components/AddTickerForm.vue";
import AppSpinner from "./components/AppSpinner.vue";
import ErrorBoundary from "./components/ErrorBoundary.vue";
import TickerChart from "./components/TickerChart.vue";
import TickerList from "./components/TickerList.vue";
import BaseDivider from "./shared/bases/BaseDivider.vue";
import { useTickerStore } from "./shared/stores";

const tickerStore = useTickerStore();

const isEmptyTickers = computed(() => tickerStore.tickers.length !== 0);
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
      <Transition name="divider-ticker-list">
        <div class="container" v-if="isEmptyTickers">
          <BaseDivider />
        </div>
      </Transition>
      <section>
        <div class="container">
          <div>
            <TickerList />
          </div>
        </div>
      </section>
      <Transition name="divider-ticker-chart">
        <div class="container" v-if="tickerStore.selectedTicker">
          <BaseDivider />
        </div>
      </Transition>
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

<style scoped>
.divider-ticker-list-enter-active,
.divider-ticker-list-leave-active,
.divider-ticker-chart-enter-active,
.divider-ticker-chart-leave-active {
  @apply transition-opacity duration-300 ease-in-out;
}

.divider-ticker-list-enter,
.divider-ticker-list-leave-to,
.divider-ticker-chart-enter,
.divider-ticker-chart-leave-to {
  @apply opacity-0;
}
</style>
