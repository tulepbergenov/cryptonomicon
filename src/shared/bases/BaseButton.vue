<script setup lang="ts">
const { label, iconPosition = "left" } = defineProps<{
  label: string;
  iconPosition?: "left" | "right";
}>();
</script>

<template>
  <button
    class="flex items-center gap-1 bg-gray-600 text-white text-sm rounded-full py-2 px-4 [@media(hover:hover)]:hover:opacity-80 transition-[opacity, background-color] ease-in-out duration-300 active:opacity-80 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:hover:opacity-100 disabled:active:opacity-100"
  >
    <slot class="size-6" name="icon" v-if="iconPosition === 'left'" />
    <span>{{ label }}</span>
    <slot name="icon" v-if="iconPosition === 'right'" />
  </button>
</template>
