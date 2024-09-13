<script setup lang="ts">
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
    <button
      type="submit"
      :disabled="isTickerEmpty"
      class="mt-3 flex items-center gap-1 bg-gray-600 text-white text-sm rounded-full py-2 px-4 [@media(hover:hover)]:hover:opacity-80 transition-[opacity, background-color] ease-in-out duration-300 active:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:opacity-100 disabled:active:opacity-100"
    >
      <PlusCircleIcon class="size-6" />
      <span>Добавить</span>
    </button>
  </form>
</template>
