<script setup lang="ts">
interface Props {
  coins: string[];
  onAddTicker: (name: string) => void;
}

const props = defineProps<Props>();
</script>

<template>
  <ul class="flex flex-wrap gap-1.5 rounded-md bg-white px-3 py-2 shadow-md">
    <li
      v-if="!props.coins.length"
      class="inline-block h-5 w-10 animate-pulse rounded-md bg-gray-200"
    ></li>
    <li
      v-if="!props.coins.length"
      class="inline-block h-5 w-8 animate-pulse rounded-md bg-gray-200"
    ></li>
    <li
      v-if="!props.coins.length"
      class="inline-block h-5 w-12 animate-pulse rounded-md bg-gray-200"
    ></li>
    <li
      v-if="!props.coins.length"
      class="inline-block h-5 w-7 animate-pulse rounded-md bg-gray-200"
    ></li>
    <li
      v-if="!props.coins.length"
      class="inline-block h-5 w-10 animate-pulse rounded-md bg-gray-200"
    ></li>
    <li v-for="coin in props.coins.slice(0, 5)" :key="coin" class="flex">
      <button
        @click="() => props.onAddTicker(coin)"
        type="button"
        class="inline-block items-center rounded-md bg-gray-200 px-2 py-0.5 text-xs uppercase text-gray-800 transition-colors duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-300 md:hover:bg-gray-300"
      >
        {{ coin }}
      </button>
    </li>
  </ul>
</template>
