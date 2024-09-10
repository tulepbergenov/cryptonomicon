<script setup lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <form class="max-w-xs">
    <label for="wallet" class="block text-sm text-gray-700">Тикер</label>
    <div class="mt-1 relative rounded-md shadow-md">
      <input
        type="text"
        name="wallet"
        id="wallet"
        class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
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
      class="mt-3 flex items-center gap-1 bg-gray-600 text-white text-sm rounded-full py-2 px-4 [@media(hover:hover)]:hover:opacity-80 transition-opacity ease-in-out duration-300 active:opacity-80"
    >
      <PlusCircleIcon class="size-6" />
      <span>Добавить</span>
    </button>
  </form>
</template>
