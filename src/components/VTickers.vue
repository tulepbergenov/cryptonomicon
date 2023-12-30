<script setup lang="ts">
import VTicker from "@/components/VTicker.vue";
import VDivider from "@/components/VDivider.vue";

interface Props {
  tickers: string[];
  selectedTicker: string | null;
  onSelectTicker: (name: string) => void;
  onDeleteTicker: (name: string) => void;
}

const props = defineProps<Props>();
</script>

<template>
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
            <VTicker
              v-for="ticker in props.tickers"
              :key="ticker"
              :ticker="ticker"
              :selected-ticker="props.selectedTicker"
              :on-select-ticker="props.onSelectTicker"
              :on-delete-ticker="props.onDeleteTicker"
            />
          </TransitionGroup>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.tickers-enter-active,
.tickers-leave-active {
  transition: all 0.2s ease-in-out;
}

.tickers-enter-from,
.tickers-leave-to {
  opacity: 0;
}
</style>
