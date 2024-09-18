<script setup lang="ts">
import { formatPrice } from "@/shared/libs";
import { useTickerStore } from "@/shared/stores";
import { TickerType } from "@/shared/types";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { computed } from "vue";

const props = defineProps<{
  ticker: TickerType;
}>();

const tickerStore = useTickerStore();

const isSelected = computed(
  () => tickerStore.selectedTicker?.id === props.ticker.id
);

const value = computed(() => {
  return props.ticker.price === "-" ? "-" : formatPrice(props.ticker.price);
});
</script>

<template>
  <article
    @click="tickerStore.setSelectedTicker(props.ticker)"
    tabindex="0"
    :class="{
      'before:opacity-100': isSelected,
      'before:opacity-0': !isSelected,
    }"
    class="cursor-pointer drop-shadow-md [@media(hover:hover)]:hover:drop-shadow-lg transition-[filter] ease-in-out duration-300 relative before:content-[''] before:-z-[1] before:absolute before:-top-[6px] before:-left-[6px] before:size-[calc(100%+12px)] before:transition-opacity before:duration-300 before:ease-in-out before:border-[2px] before:border-purple-800 before:rounded-xl"
  >
    <div
      class="px-4 py-5 text-center flex flex-col uppercase rounded-t-lg bg-white"
    >
      <span class="text-sm text-gray-500">{{ props.ticker.name }}</span>
      <span class="mt-1 text-3xl text-gray-900">{{ value }}</span>
    </div>
    <button
      @click.stop="tickerStore.removeTicker(props.ticker.id)"
      class="flex items-center text-sm justify-center gap-1 rounded-b-lg w-full bg-gray-100 py-4 px-6 text-md text-gray-500 [@media(hover:hover)]:hover:bg-gray-200 transition-colors ease-in-out duration-300"
    >
      <trash-icon class="size-4" />
      <span>Удалить</span>
    </button>
  </article>
</template>
