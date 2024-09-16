<script setup lang="ts">
import BaseButton from "@/shared/bases/BaseButton.vue";
import { useTickerStore } from "@/shared/stores";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import { computed, ref } from "vue";

const tickerStore = useTickerStore();

const ticker = ref("");

const handleAddTickerSubmit = () => {
  tickerStore.addTicker({
    id: Math.random().toString(36).substr(2, 9),
    name: ticker.value,
    price: 0,
  });
  ticker.value = "";
};

const isTickerEmpty = computed(() => ticker.value.length === 0);
</script>

<template>
  <form class="w-full" @submit.prevent="handleAddTickerSubmit">
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
    <div class="text-sm text-red-600 my-3">
      <span>Такой тикер уже добавлен</span>
    </div>
    <base-button type="submit" :disabled="isTickerEmpty" label="Добавить">
      <template #icon>
        <plus-circle-icon class="size-6" />
      </template>
    </base-button>
  </form>
</template>
