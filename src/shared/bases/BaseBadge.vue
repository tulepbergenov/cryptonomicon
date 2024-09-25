<template>
  <button
    class="inline-block items-center px-2 rounded-md text-xs bg-gray-300 text-gray-800 cursor-pointer [@media(hover:hover)]:hover:opacity-60 transition-opacity ease-in-out duration-300 active:opacity-60"
    v-bind="props"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

type PropsType = {
  type?: "button" | "submit" | "reset";
};

const props = defineProps<PropsType>();
</script>
