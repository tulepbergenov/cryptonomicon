<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import {
  windowDisableScrolling,
  windowEnableScrolling,
  findTicker,
} from "@/shared/utils";
import VAppPreloader from "@/shared/ui-kit/VAppPreloader.vue";
import VDivider from "@/shared/ui-kit/VDivider.vue";
import { PlusCircleIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { XCircleIcon } from "@heroicons/vue/24/solid";
import { getCoinList } from "@/shared/api";

const isLoading = ref(false);
const formCreateTickerNewTicker = ref("");
const coins: Ref<string[]> = ref([]);
const tickers = ref(["VUE", "REACT"]);
const selectedTicker: Ref<string | null> = ref(tickers.value[0]);
const tickerExistsErrorShow = ref(false);

onMounted(() => {
  isLoading.value = true;
  windowDisableScrolling();

  getCoinList()
    .then((res) => {
      isLoading.value = false;
      windowEnableScrolling();
      coins.value = res;
    })
    .catch((err) => {
      isLoading.value = false;
      windowEnableScrolling();
      console.log(err);
    });
});

const createTicker = (name?: string) => {
  if (name) {
    const tickerExists = findTicker(name, tickers.value);

    if (!tickerExists) {
      tickers.value.push(name);
      resetTickerForm();
    }
  }

  if (!formCreateTickerNewTicker.value.trim().length) {
    formCreateTickerNewTicker.value = "";

    return;
  }

  const tickerExists = findTicker(
    formCreateTickerNewTicker.value,
    tickers.value,
  );

  if (!tickerExists) {
    tickers.value.push(formCreateTickerNewTicker.value);
    resetTickerForm();
  }
};

const closeSelectedTickerChart = () => {
  selectedTicker.value = null;
};

const selectTicker = (name: string) => {
  selectedTicker.value = name;
};

const deleteTicker = (name: string) => {
  tickers.value = tickers.value.filter((ticker) => {
    if (name === selectedTicker.value) {
      selectedTicker.value = null;
    }

    if (ticker !== name) {
      return ticker;
    }
  });
};

const resetTickerForm = () => {
  formCreateTickerNewTicker.value = "";
};
</script>

<template>
  <main class="flex-auto pb-32 pt-10">
    <VAppPreloader :is-loading="isLoading" />
    <section class="sr-only">
      <header>
        <h1>Cryptonomicon</h1>
      </header>
    </section>
    <section>
      <div class="container">
        <div>
          <form @submit.prevent="() => createTicker()" class="md:max-w-sm">
            <fieldset>
              <legend>
                <label
                  for="coin"
                  class="block text-sm font-medium text-gray-700"
                  >Тикер</label
                >
              </legend>
              <div class="relative mt-1 rounded-md shadow-md">
                <input
                  v-model="formCreateTickerNewTicker"
                  type="text"
                  name="coin"
                  id="coin"
                  class="block w-full rounded-md border-gray-300 pr-10 text-gray-900 focus:border-gray-300 focus:ring-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  placeholder="Например DOGE"
                />
              </div>
              <Transition name="coins">
                <ul
                  v-if="coins.length"
                  class="flex flex-wrap gap-1.5 rounded-md bg-white px-3 py-2 shadow-md"
                >
                  <li
                    v-for="coin in coins.slice(0, 4)"
                    :key="coin"
                    class="flex"
                  >
                    <button
                      @click="() => createTicker(coin)"
                      type="button"
                      class="inline-block items-center rounded-md bg-gray-200 px-2 py-0.5 text-xs uppercase text-gray-800 transition-colors duration-150 ease-in-out hover:bg-gray-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                    >
                      {{ coin }}
                    </button>
                  </li>
                </ul></Transition
              >
              <Transition name="ticker-error">
                <div
                  v-if="tickerExistsErrorShow"
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
    <section>
      <div class="container">
        <div>
          <VDivider />
          <div>
            <TransitionGroup
              name="tickers"
              tag="ul"
              class="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
            >
              <li v-for="ticker in tickers" :key="ticker">
                <article
                  class="relative cursor-pointer drop-shadow-sm transition-[filter] duration-150 ease-in-out before:absolute before:left-2/4 before:top-2/4 before:-z-[1] before:h-[calc(100%+8px)] before:w-[calc(100%+8px)] before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-xl before:border-2 before:transition-colors before:duration-150 before:ease-in-out before:content-[''] hover:drop-shadow-md"
                  :class="{
                    'before:border-purple-700': ticker === selectedTicker,
                    'before:border-transparent': ticker !== selectedTicker,
                  }"
                >
                  <div
                    @click="() => selectTicker(ticker)"
                    tabindex="0"
                    aria-label="Показать график VUE"
                    title="Показать график VUE"
                    class="flex flex-col rounded-t-lg border border-gray-200 bg-white px-4 py-5 text-center focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    <span class="truncate text-sm uppercase text-gray-500">
                      {{ ticker }} - USD
                    </span>
                    <span class="mt-1 text-3xl font-bold text-gray-900">
                      1.11
                    </span>
                  </div>
                  <button
                    @click.prevent="() => deleteTicker(ticker)"
                    type="button"
                    class="text-md flex w-full items-center justify-center gap-1 rounded-b-lg border-x border-b border-gray-200 bg-gray-100 px-4 py-4 text-gray-500 transition-colors duration-150 ease-in-out hover:bg-gray-200 hover:text-gray-600 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    <TrashIcon class="h-5 w-5" />
                    <span>Удалить</span>
                  </button>
                </article>
              </li>
            </TransitionGroup>
          </div>
        </div>
      </div>
    </section>
    <Transition name="selectedTickerChart">
      <section v-if="selectedTicker">
        <div class="container">
          <div>
            <VDivider />
            <div>
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-bold uppercase leading-6 text-gray-900">
                  {{ selectedTicker }} - USD
                </h2>
                <button
                  @click="closeSelectedTickerChart"
                  type="button"
                  title="Закрыть график VUE"
                  aria-label="Закрыть график VUE"
                  class="text-gray-500 transition-colors duration-150 ease-in-out hover:text-gray-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
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
  </main>
</template>

<style scoped>
.selectedTickerChart-enter-active,
.selectedTickerChart-leave-active {
  transition: opacity 0.2s ease-in-out;
}

.selectedTickerChart-enter-from,
.selectedTickerChart-leave-to {
  opacity: 0;
}

.tickers-enter-active,
.tickers-leave-active {
  transition: all 0.2s ease-in-out;
}

.tickers-enter-from,
.tickers-leave-to {
  opacity: 0;
}

.ticker-error-enter-active,
.ticker-error-leave-active {
  transition: all 0.2s ease-in-out;
}

.ticker-error-enter-from,
.ticker-error-leave-to {
  opacity: 0;
}

.coins-enter-active,
.coins-leave-active {
  transition: all 0.2s ease-in-out;
}

.coins-enter-from,
.coins-leave-to {
  opacity: 0;
}
</style>
