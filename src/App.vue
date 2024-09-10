<script setup lang="ts">
import AddTickerForm from "./features/AddTickerForm.vue";
import AppSpinner from "./features/AppSpinner.vue";
import TickerChart from "./features/TickerChart.vue";
import TickerList from "./features/TickerList.vue";
import BaseDivider from "./shared/bases/BaseDivider.vue";
</script>

<template>
  <main class="flex-auto mb-20">
    <h1 class="sr-only">
      Cryptonomicon tracks live currency and crypto rates 📈
    </h1>
    <AppSpinner />
    <section class="mt-10">
      <div class="container">
        <div>
          <AddTickerForm />
        </div>
      </div>
    </section>
    <div class="container">
      <BaseDivider />
    </div>
    <section>
      <div class="container">
        <div>
          <TickerList />
        </div>
      </div>
    </section>
    <div class="container">
      <BaseDivider />
    </div>
    <section>
      <div class="container">
        <div>
          <TickerChart />
        </div>
      </div>
    </section>
  </main>
</template>
