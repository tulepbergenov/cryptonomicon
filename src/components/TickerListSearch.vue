<template>
  <form>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search for a ticker"
    />
  </form>
</template>

<script setup lang="ts">
import { computed } from "vue";

type PropsType = {
  searchFilter: string;
};

const props = defineProps<PropsType>();

const emit = defineEmits(["update:searchFilter"]);

const searchQuery = computed({
  get: () => props.searchFilter,
  set: (value) => emit("update:searchFilter", value),
});
</script>
