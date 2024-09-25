<template>
  <form class="w-full" @submit.prevent="onSubmit">
    <label for="wallet" class="block text-sm text-gray-700">Ticker</label>
    <div class="mt-1 relative rounded-md shadow-md">
      <input
        v-model="ticker"
        type="text"
        name="wallet"
        id="wallet"
        class="block w-full pr-10 border-gray-300 text-gray-900 rounded-md"
        placeholder="Enter a ticker, e.g. BTC"
      />
    </div>
    <CoinSuggestions :ticker="ticker || ''" :addTicker="handleAddTicker" />
    <div
      v-if="errors.ticker || isExistsSameTicker"
      class="text-sm text-red-600 mt-3"
    >
      <span>{{ errors.ticker }}</span>
      <span v-if="isExistsSameTicker">Ticker already exists</span>
    </div>
    <BaseButton type="submit" :disabled="isEmpty" label="Add" class="mt-3">
      <template #icon>
        <PlusCircleIcon class="size-6" />
      </template>
    </BaseButton>
  </form>
</template>

<script setup lang="ts">
import CoinSuggestions from "@/components/CoinSuggestions.vue";
import BaseButton from "@/shared/bases/BaseButton.vue";
import { useTickerStore } from "@/shared/stores";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed, ref, watch } from "vue";
import * as zod from "zod";

const tickerStore = useTickerStore();

const isExistsSameTicker = ref(false);

const validationSchema = toTypedSchema(
  zod.object({
    ticker: zod.string({ message: "Ticker cannot be empty" }),
  })
);

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema,
});

const [ticker] = defineField("ticker");

const handleAddTicker = (name: string) => {
  if (tickerStore.tickers.some((ticker) => ticker.name === name)) {
    isExistsSameTicker.value = true;
    return;
  }

  tickerStore.addTicker(name);

  resetForm();
};

const onSubmit = handleSubmit((values) => {
  handleAddTicker(values.ticker.trim().toUpperCase());
});

watch(ticker, () => {
  isExistsSameTicker.value = false;
});

const isEmpty = computed(() => !ticker.value?.trim());
</script>
