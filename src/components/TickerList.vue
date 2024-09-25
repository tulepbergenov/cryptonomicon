<template>
  <div class="flex items-center gap-6 flex-wrap">
    <TickerListSearch v-model:search-filter="searchFilter" />
    <TickerListPagination
      v-model:current-page="currentPage"
      :total-pages="totalPages"
    />
  </div>
  <ul
    name="ticker-list"
    tag="div"
    class="mt-5 grid md:grid-cols-2 gap-5 lg:grid-cols-3"
  >
    <li :key="ticker.id" v-for="ticker in paginatedTickers">
      <TickerListItem :ticker="ticker" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import TickerListPagination from "@/components/TickerListPagination.vue";
import TickerListSearch from "@/components/TickerListSearch.vue";
import { tickerStorageService } from "@/shared/libs";
import { useTickerStore } from "@/shared/stores";
import { computed, onMounted, ref, watch } from "vue";
import { toast } from "vue-sonner";
import { z } from "zod";
import TickerListItem from "./TickerListItem.vue";

const querySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val) : 1))
    .refine((val) => val > 0, {
      message: "Page number must be greater than 0",
    }),
  searchTicker: z.string().optional(),
});

const TICKERS_PER_PAGE = 6;

const searchFilter = ref("");

const currentPage = ref(1);

const tickerStore = useTickerStore();

onMounted(() => {
  const tickersFromLocalStorage = tickerStorageService.getTickers();

  if (tickersFromLocalStorage.length) {
    for (const ticker of tickersFromLocalStorage) {
      tickerStore.addTicker(ticker);
    }
  }
});

const filteredTickers = computed(() => {
  if (!searchFilter.value) return tickerStore.tickers;

  return tickerStore.tickers.filter((ticker) =>
    ticker.name.toLowerCase().includes(searchFilter.value.toLowerCase())
  );
});

const paginatedTickers = computed(() => {
  const start = (currentPage.value - 1) * TICKERS_PER_PAGE;
  const end = start + TICKERS_PER_PAGE;

  return filteredTickers.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredTickers.value.length / TICKERS_PER_PAGE);
});

watch(totalPages, (newTotalPages) => {
  if (currentPage.value > newTotalPages) {
    currentPage.value = newTotalPages || 1;
  }
});

watch(searchFilter, () => {
  currentPage.value = 1;
});

watch(searchFilter, (newFilter) => {
  const url = new URL(window.location.href);

  if (newFilter) {
    url.searchParams.set("searchTicker", newFilter);
  } else {
    url.searchParams.delete("searchTicker");
  }

  window.history.replaceState(null, "", url.toString());
});

watch(currentPage, (newPage) => {
  const url = new URL(window.location.href);

  if (newPage > 1) {
    url.searchParams.set("page", newPage.toString());
  } else {
    url.searchParams.delete("page");
  }

  window.history.replaceState(null, "", url.toString());
});

onMounted(() => {
  const url = new URL(window.location.href);
  const queryParams = {
    page: url.searchParams.get("page") ?? "1",
    searchTicker: url.searchParams.get("searchTicker") ?? "",
  };

  const result = querySchema.safeParse(queryParams);

  if (result.success) {
    const { page, searchTicker } = result.data;

    currentPage.value = page;
    searchFilter.value = searchTicker || "";
  } else {
    toast.error(result.error.errors.map((e) => e.message).join(", "));

    console.error(result.error);
  }
});
</script>
