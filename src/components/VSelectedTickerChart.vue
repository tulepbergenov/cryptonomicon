<script setup lang="ts">
import { XCircleIcon } from "@heroicons/vue/24/solid";
import VDivider from "@/components/VDivider.vue";

interface Props {
  selectedTicker: string | null;
  onCloseSelectedTickerChart: () => void;
}

const props = defineProps<Props>();
</script>

<template>
  <Transition name="selected-ticker-chart">
    <section v-if="props.selectedTicker">
      <div class="container">
        <div>
          <VDivider />
          <div>
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-bold uppercase leading-6 text-gray-900">
                {{ props.selectedTicker }} - USD
              </h2>
              <button
                @click="props.onCloseSelectedTickerChart"
                type="button"
                :title="`Закрыть график ${props.selectedTicker}`"
                :aria-label="`Закрыть график ${props.selectedTicker}`"
                class="text-gray-500 transition-colors duration-150 ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:text-gray-600 md:hover:text-gray-600"
              >
                <XCircleIcon class="h-9 w-9" />
              </button>
            </div>
            <ul
              class="mt-6 flex h-64 items-end gap-1 border-b border-l border-gray-400 p-1"
            >
              <li class="h-24 w-10 border bg-purple-800"></li>
              <li class="h-32 w-10 border bg-purple-800"></li>
              <li class="h-48 w-10 border bg-purple-800"></li>
              <li class="h-16 w-10 border bg-purple-800"></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.selected-ticker-chart-enter-active,
.selected-ticker-chart-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.selected-ticker-chart-enter-from,
.selected-ticker-chart-leave-to {
  opacity: 0;
}
</style>
