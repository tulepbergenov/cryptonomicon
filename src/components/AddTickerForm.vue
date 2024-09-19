<script setup lang="ts">
import CoinSuggestions from "@/components/CoinSuggestions.vue";
import BaseButton from "@/shared/bases/BaseButton.vue";
import { useTickerStore } from "@/shared/stores";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { computed } from "vue";
import * as zod from "zod";

const tickerStore = useTickerStore();

const validationSchema = toTypedSchema(
  zod.object({
    ticker: zod.string({ message: "Ticker cannot be empty" }),
  })
);

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema,
});

const [ticker] = defineField("ticker");

const onSubmit = handleSubmit((values) => {
  const name = values.ticker.trim();

  tickerStore.addTicker(name);

  resetForm();
});

const isEmpty = computed(() => !ticker.value);
</script>

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
    <coin-suggestions />
    <div v-if="errors.ticker" class="text-sm text-red-600 mt-3">
      <span>{{ errors.ticker }}</span>
    </div>
    <base-button type="submit" :disabled="isEmpty" label="Add" class="mt-3">
      <template #icon>
        <plus-circle-icon class="size-6" />
      </template>
    </base-button>
  </form>
</template>
