<script setup lang="ts">
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
    ticker: zod.string({ message: "Тикер не может быть пустым" }),
  })
);

const { defineField, handleSubmit, errors, resetForm } = useForm({
  validationSchema,
});

const [ticker] = defineField("ticker");

const onSubmit = handleSubmit((values) => {
  tickerStore.addTicker({
    id: Math.random().toString(36),
    name: values.ticker,
    price: 0,
  });

  resetForm();
});

const isEmpty = computed(() => !ticker.value);
</script>

<template>
  <form class="w-full" @submit.prevent="onSubmit">
    <label for="wallet" class="block text-sm text-gray-700">Тикер</label>
    <div class="mt-1 relative rounded-md shadow-md">
      <input
        v-model="ticker"
        type="text"
        name="wallet"
        id="wallet"
        class="block w-full pr-10 border-gray-300 text-gray-900 rounded-md"
        placeholder="Например DOGE"
      />
    </div>
    <ul
      class="flex bg-white shadow-md p-2 rounded-md flex-wrap items-center gap-1"
    >
      <li class="flex">
        <button
          type="button"
          class="inline-block items-center px-2 rounded-md text-xs bg-gray-300 text-gray-800 cursor-pointer [@media(hover:hover)]:hover:opacity-60 transition-opacity ease-in-out duration-300 active:opacity-60"
        >
          BTC
        </button>
      </li>
    </ul>
    <div v-if="errors.ticker" class="text-sm text-red-600 mt-3">
      <span>{{ errors.ticker }}</span>
    </div>
    <base-button
      type="submit"
      :disabled="isEmpty"
      label="Добавить"
      class="mt-3"
    >
      <template #icon>
        <plus-circle-icon class="size-6" />
      </template>
    </base-button>
  </form>
</template>
