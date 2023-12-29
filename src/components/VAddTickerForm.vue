<script setup lang="ts">
import { ref } from "vue";

interface Props {
  coins: string;
  addTicker: (string?: string) => void;
  tickerExistsErrorShow: boolean;
}

const props = defineProps<Props>();

const ticker = ref("");
</script>

<template>
  <section>
    <div class="container">
      <div>
        <form @submit.prevent="() => props.addTicker()" class="md:max-w-sm">
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
            <ul
              class="flex flex-wrap gap-1.5 rounded-md bg-white px-3 py-2 shadow-md"
            >
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
                v-for="coin in props.coins.slice(0, 4)"
                :key="coin"
                class="flex"
              >
                <button
                  @click="() => addTicker(coin)"
                  type="button"
                  class="inline-block items-center rounded-md bg-gray-200 px-2 py-0.5 text-xs uppercase text-gray-800 transition-colors duration-150 ease-in-out hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                >
                  {{ coin }}
                </button>
              </li>
            </ul>
            <Transition name="ticker-error">
              <div
                v-if="props.tickerExistsErrorShow"
                class="mt-2 text-sm text-red-600"
              >
                <span>Такой тикер уже добавлен</span>
              </div>
            </Transition>
            <button
              type="submit"
              class="mt-3 flex items-center gap-1 rounded-full bg-gray-600 px-4 py-2 text-sm leading-4 text-white shadow-sm transition-[background,box-shadow] duration-300 hover:bg-gray-700 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
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
