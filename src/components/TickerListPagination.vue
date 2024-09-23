<script setup lang="ts">
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/vue/24/outline";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

const emit = defineEmits(["update:currentPage"]);

const handlePrevPage = () => {
  if (props.currentPage === 1) return;

  emit("update:currentPage", props.currentPage - 1);
};

const handleNextPage = () => {
  if (props.currentPage === props.totalPages) return;

  emit("update:currentPage", props.currentPage + 1);
};
</script>

<template>
  <ul class="flex items-center flex-wrap gap-2">
    <li class="flex">
      <button
        type="button"
        class="size-6 [@media(hover:hover)]:hover:opacity-60 transition-opacity ease-in-out duration-300 disabled:opacity-30"
        title="Previous page"
        aria-label="Previous page"
        @click="handlePrevPage"
        :disabled="props.currentPage === 1 || props.totalPages === 0"
      >
        <ArrowLeftIcon />
      </button>
    </li>
    <li class="flex">
      <button
        type="button"
        class="size-6 [@media(hover:hover)]:hover:opacity-60 transition-opacity ease-in-out duration-300 disabled:opacity-30"
        title="Next page"
        aria-label="Next page"
        @click="handleNextPage"
        :disabled="
          props.currentPage === props.totalPages || props.totalPages === 0
        "
      >
        <ArrowRightIcon />
      </button>
    </li>
  </ul>
</template>
