<script setup lang="ts">
import { ref } from "vue";
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import VCoins from "@/components/VCoins.vue";

interface Props {
  coins: string[];
  onAddTicker: (string?: string) => void;
  isTickerExistsErrorShow: boolean;
}

const props = defineProps<Props>();

const ticker = ref("");
</script>

<template>
  <section>
    <div class="container">
      <div>
        <form @submit.prevent="() => props.onAddTicker()" class="md:max-w-sm">
          <fieldset>
            <legend>
              <label for="coin" class="block text-sm font-medium text-gray-700"
                >Тикер</label
              >
            </legend>
            <div class="relative mt-1 rounded-md shadow-md">
              <input
                v-model="ticker"
                type="text"
                name="coin"
                id="coin"
                class="block w-full rounded-md border-gray-300 pr-10 text-gray-900 focus:border-gray-300 focus:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                placeholder="Например DOGE"
              />
            </div>
            <VCoins :coins="props.coins" :on-add-ticker="props.onAddTicker" />
            <Transition name="ticker-error">
              <div
                v-if="props.isTickerExistsErrorShow"
                class="mt-2 text-sm text-red-600"
              >
                <span>Такой тикер уже добавлен</span>
              </div>
            </Transition>
            <button
              type="submit"
              class="mt-3 flex items-center gap-1 rounded-full bg-gray-600 px-4 py-2 text-sm leading-4 text-white shadow-sm transition-[background,box-shadow] duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-gray-700 md:hover:bg-gray-700 md:hover:shadow-md"
            >
              <PlusCircleIcon class="h-6 w-6" />
              <span>Добавить</span>
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ticker-error-enter-active,
.ticker-error-leave-active {
  transition: all 0.2s ease-in-out;
}

.ticker-error-enter-from,
.ticker-error-leave-to {
  opacity: 0;
}
</style>
