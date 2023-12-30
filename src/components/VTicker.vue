<script setup lang="ts">
import { TrashIcon } from "@heroicons/vue/24/outline";

interface Props {
  ticker: string;
  selectedTicker: string | null;
  selectTicker: (name: string) => void;
  deleteTicker: (name: string) => void;
}

const props = defineProps<Props>();
</script>

<template>
  <li>
    <article
      class="relative cursor-pointer drop-shadow-sm transition-[filter] duration-150 ease-in-out before:absolute before:left-2/4 before:top-2/4 before:-z-[1] before:h-[calc(100%+8px)] before:w-[calc(100%+8px)] before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-xl before:border-2 before:transition-colors before:duration-150 before:ease-in-out before:content-[''] hover:drop-shadow-md"
      :class="{
        'before:border-purple-700': props.ticker === props.selectedTicker,
        'before:border-transparent': props.ticker !== props.selectedTicker,
      }"
    >
      <div
        @click="() => props.selectTicker(ticker)"
        tabindex="0"
        aria-label="Показать график VUE"
        title="Показать график VUE"
        class="flex flex-col rounded-t-lg border border-gray-200 bg-white px-4 py-5 text-center focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <span class="truncate text-sm uppercase text-gray-500">
          {{ props.ticker }} - USD
        </span>
        <span class="mt-1 text-3xl font-bold text-gray-900">1.11</span>
      </div>
      <button
        @click.prevent="() => props.deleteTicker(ticker)"
        type="button"
        class="text-md flex w-full items-center justify-center gap-1 rounded-b-lg border-x border-b border-gray-200 bg-gray-100 px-4 py-4 text-gray-500 transition-colors duration-150 ease-in-out hover:bg-gray-200 hover:text-gray-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
      >
        <TrashIcon class="h-5 w-5" />
        <span>Удалить</span>
      </button>
    </article>
  </li>
</template>
