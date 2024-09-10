<script setup lang="ts">
import { PlusCircleIcon } from "@heroicons/vue/24/outline";
import AppSpinner from "./features/AppSpinner.vue";
import BaseDivider from "./shared/bases/BaseDivider.vue";
import { TrashIcon } from "@heroicons/vue/24/outline";
import { XCircleIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <main class="flex-auto mb-20">
    <AppSpinner />
    <section class="mt-10">
      <div class="container">
        <div>
          <form class="max-w-xs">
            <label for="wallet" class="block text-sm text-gray-700"
              >Тикер</label
            >
            <div class="mt-1 relative rounded-md shadow-md">
              <input
                type="text"
                name="wallet"
                id="wallet"
                class="block w-full pr-10 border-gray-300 text-gray-900 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm rounded-md"
                placeholder="Например DOGE"
              />
            </div>
            <div class="flex bg-white shadow-md p-1 rounded-md flex-wrap">
              <span
                class="inline-flex items-center px-2 m-1 rounded-md text-xs bg-gray-300 text-gray-800 cursor-pointer"
              >
                BTC
              </span>
              <span
                class="inline-flex items-center px-2 m-1 rounded-md text-xs bg-gray-300 text-gray-800 cursor-pointer"
              >
                DOGE
              </span>
              <span
                class="inline-flex items-center px-2 m-1 rounded-md text-xs bg-gray-300 text-gray-800 cursor-pointer"
              >
                BCH
              </span>
              <span
                class="inline-flex items-center px-2 m-1 rounded-md text-xs bg-gray-300 text-gray-800 cursor-pointer"
              >
                CHD
              </span>
            </div>
            <div class="text-sm text-red-600">Такой тикер уже добавлен</div>
            <button
              type="button"
              class="mt-4 inline-flex items-center py-2 px-4 border border-transparent shadow-sm text-sm leading-4 rounded-full text-white bg-gray-600 hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <PlusCircleIcon class="size-6" />
              <span>Добавить</span>
            </button>
          </form>
        </div>
      </div>
    </section>
    <div class="container">
      <BaseDivider />
    </div>
    <section>
      <div class="container">
        <div>
          <div class="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <article
              class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid cursor-pointer"
            >
              <div class="px-4 py-5 sm:p-6 text-center flex flex-col">
                <span class="text-sm text-gray-500 truncate">WTF - USD</span>
                <span class="mt-1 text-3xl text-gray-900">1.11</span>
              </div>
              <div class="w-full border-t border-gray-200"></div>
              <button
                class="flex items-center justify-center w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
              >
                <TrashIcon class="size-5" />
                <span>Удалить</span>
              </button>
            </article>
            <article
              class="bg-white overflow-hidden shadow rounded-lg border-purple-800 border-solid border-4 cursor-pointer"
            >
              <div class="px-4 py-5 sm:p-6 text-center flex flex-col">
                <span class="text-sm text-gray-500 truncate">VUE - RUB</span>
                <span class="mt-1 text-3xl text-gray-900">80000.00</span>
              </div>
              <div class="w-full border-t border-gray-200"></div>
              <button
                class="flex items-center justify-center w-full bg-gray-100 px-4 py-4 sm:px-6 text-md text-gray-500 hover:text-gray-600 hover:bg-gray-200 hover:opacity-20 transition-all focus:outline-none"
              >
                <TrashIcon class="size-5" />
                <span>Удалить</span>
              </button>
            </article>
          </div>
        </div>
      </div>
    </section>
    <div class="container">
      <BaseDivider />
    </div>
    <section>
      <div class="container">
        <div class="relative">
          <h3 class="text-lg text-gray-900">VUE - USD</h3>
          <div
            class="flex items-end border-gray-600 border-b border-l h-64 mt-8"
          >
            <div class="bg-purple-800 border w-10 h-24"></div>
            <div class="bg-purple-800 border w-10 h-32"></div>
            <div class="bg-purple-800 border w-10 h-48"></div>
            <div class="bg-purple-800 border w-10 h-16"></div>
          </div>
          <button type="button" class="absolute top-0 right-0">
            <XCircleIcon class="size-7" />
          </button>
        </div>
      </div>
    </section>
  </main>
</template>
